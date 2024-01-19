package future

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOauthConfig *oauth2.Config
	oauthStateString  = "random" // Replace with a random string for security
	client            *mongo.Client
	db                *mongo.Database
	mu                sync.RWMutex
	secretKey         = []byte("your-secret-key") // Replace with a strong and secure secret key
)

const (
	googleAPIURL = "https://www.googleapis.com/oauth2/v2/userinfo"
)

// User struct to store user information
type User struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

// JWTClaims represents the claims of the JWT token
type JWTClaims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func init() {
	googleOauthConfig = &oauth2.Config{
		ClientID:     "your-client-id",
		ClientSecret: "your-client-secret",
		RedirectURL:  "http://localhost:8080/auth/oauth/google",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	// Set up MongoDB connection
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	// Set up the database
	db = client.Database("your-database-name") // Replace with your database name
}

func main() {
	http.HandleFunc("/", handleMain)
	http.HandleFunc("/auth/oauth/google", handleGoogleLogin)
	http.HandleFunc("/auth/oauth/google/callback", handleGoogleCallback)
	http.HandleFunc("/login", handleLogin)
	http.HandleFunc("/signin", handleSignIn)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleMain(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "<h1>Hello, welcome to the website!</h1><a href=\"/auth/oauth/google\">Login with Google</a>")
}

func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	state := r.FormValue("state")
	if state != oauthStateString {
		fmt.Println("Invalid oauth state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	code := r.FormValue("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Printf("Code exchange failed: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	client := googleOauthConfig.Client(context.Background(), token)
	response, err := client.Get(googleAPIURL)
	if err != nil {
		fmt.Printf("Failed to get user info: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	defer response.Body.Close()

	var user User
	err = json.NewDecoder(response.Body).Decode(&user)
	if err != nil {
		fmt.Printf("Failed to decode user info: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Add or update the user in the MongoDB collection
	if err := upsertUser(user); err != nil {
		fmt.Printf("Failed to upsert user: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Generate a JWT token
	tokenString, err := generateJWT(user.ID)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Set the JWT token as a cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: time.Now().Add(24 * time.Hour), // Adjust expiration as needed
		Path:    "/",
	})

	// Now you have user information in the 'user' variable.
	fmt.Printf("User ID: %s\n", user.ID)
	fmt.Printf("User Email: %s\n", user.Email)
	fmt.Printf("User Name: %s\n", user.Name)
	fmt.Printf("User Picture: %s\n", user.Picture)
	fmt.Printf("Is Verified Email: %v\n", user.VerifiedEmail)

	// TODO: Use the user information and JWT token in your application as needed.

	fmt.Println("Successfully authenticated with Google")

	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func upsertUser(user User) error {
	collection := db.Collection("users") // Replace with your collection name

	// Check if the user already exists in the collection
	filter := bson.M{"email": user.Email}
	update := bson.M{"$set": user}

	opts := options.Update().SetUpsert(true)
	_, err := collection.UpdateOne(context.Background(), filter, update, opts)

	return err
}

func generateJWT(userID string) (string, error) {
	claims := JWTClaims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(), // Adjust expiration as needed
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	// Implement login logic using the MongoDB collection
	email := r.FormValue("email")
	password := r.FormValue("password")

	var user User
	collection := db.Collection("users") // Replace with your collection name

	// Find the user in the collection
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		fmt.Fprintf(w, "User not found. Please sign up.")
		return
	}

	// You can add password validation logic here

	// Generate a new JWT token
	tokenString, err := generateJWT(user.ID)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Set the JWT token as a cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: time.Now().Add(24 * time.Hour), // Adjust expiration as needed
		Path:    "/",
	})

	fmt.Fprintf(w, "Login successful!\nUser ID: %s\nUser Email: %s\n", user.ID, user.Email)
}

func handleSignIn(w http.ResponseWriter, r *http.Request) {
	// Implement sign-up logic and add the new user to the MongoDB collection
	email := r.FormValue("email")
	password := r.FormValue("password")

	// Check if the user already exists in the collection
	collection := db.Collection("users") // Replace with your collection name
	var existingUser User
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&existingUser)
	if err == nil {
		fmt.Fprintf(w, "User already exists. Please log in.")
		return
	}

	// Create a new user
	newUser := User{
		ID:    "new-user-id", // You may want to generate a unique ID
		Email: email,
		// Set other user properties as needed
	}

	// Insert the new user into the collection
	_, err = collection.InsertOne(context.Background(), newUser)
	if err != nil {
		fmt.Printf("Failed to insert user: %v\n", err)
		fmt.Fprintf(w, "Failed to create a new user.")
		return
	}

	// Generate a new JWT token
	tokenString, err := generateJWT(newUser.ID)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// Set the JWT token as a cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: time.Now().Add(24 * time.Hour), // Adjust expiration as needed
		Path:    "/",
	})

	fmt.Fprintf(w, "Sign-up successful!\nUser ID: %s\nUser Email: %s\n", newUser.ID, newUser.Email)
}
