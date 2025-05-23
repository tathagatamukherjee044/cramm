package handler

import (
	"crammServer/internal/serverutils"
	"crammServer/model"
	"crammServer/service"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// @Summary Show the status of server.
// @Description get the status of server.
// @Tags health
// @Accept */*
// @Produce plain
// @Success 200 "OK"
// @Router /health [get]
func HelloWorldHandler(c *fiber.Ctx) error {
	resp := map[string]string{
		"message": "Hello World",
	}
	return c.JSON(resp)
}

func GoogleOAuthHandler(c *fiber.Ctx) error {
	fmt.Println("here")
	codeValue := c.FormValue("code")
	fmt.Println(codeValue)
	googleAccessToken, err := service.GetGoogleToken(codeValue)
	if err != nil {
		return c.Status(401).SendString(err.Error())
	}

	googleUser, _ := service.GetGoogleUser(googleAccessToken)

	fmt.Println("google user", googleUser)

	user := service.ConvertGoogleUserToUser(googleUser)

	fmt.Println("user is converted from google user")

	userFound := service.FindUserByEmail(user.Email)
	var upsertedID string
	if userFound == nil {
		fmt.Printf("Failed to find user: %v\n", err)
		upsertedID, _ = service.InsertUser(user)

	} else {
		upsertedID, err = service.UpsertUser(user)
		if err != nil {
			fmt.Printf("Failed to upsert user: %v\n", err)
			return nil
		}
	}

	fmt.Print("here")

	//fmt.Println(upsertedID)

	//log.Panicln(upsertedID)

	// upsertedIDString, ok := upsertedID.(string)
	// if !ok {
	// 	fmt.Println("Failed to assert upsertedID to string")
	// }

	// Convert the string to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(upsertedID)
	if err != nil {
		fmt.Println("Error converting string to ObjectID:", err)
	}

	user.ID = objectID

	tokenUser := service.ConvertUserToTokenUser(user)

	//access token lasts for 1 day
	accessToken, err := serverutils.GenerateJWT(user, 1)
	if err != nil {
		fmt.Printf("Failed to generate JWT accessToken: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}

	// refresh token lasts for 365 days
	refreshToken, err := serverutils.GenerateJWT(user, 365)
	if err != nil {
		fmt.Printf("Failed to generate JWT accessToken: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}

	tokenUser.AccessToken = accessToken
	tokenUser.RefreshToken = refreshToken

	jsonData, err := json.Marshal(tokenUser)
	if err != nil {
		fmt.Printf("Failed to marshal JSON %v\n", err)
		return c.Status(401).SendString(err.Error())
	}

	encodedData := base64.StdEncoding.EncodeToString(jsonData)

	uiURL := os.Getenv("UI_URL")

	redirectURL := fmt.Sprintf("%s/auth/oauth?data=%s", uiURL, encodedData)
	isLocal := os.Getenv("IS_LOCAL")
	if isLocal == "true" {
		log.Println("isLocal")
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    accessToken,
			SameSite: "Lax",
		})
		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    refreshToken,
			SameSite: "Lax",
			Path:     "/api/auth/refresh",
		})

	} else {
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    accessToken,
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
		})

		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    refreshToken,
			HTTPOnly: true,
			Secure:   true,
			SameSite: "Lax",
			Path:     "/api/auth/refresh",
		})
	}
	return c.Redirect(redirectURL)

}

func Signup(c *fiber.Ctx) error {
	var user model.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// Check if the phone number already exists
	existingUser := service.FindUserByPhoneNumber(user.PhoneNumber)
	if existingUser != nil {
		return c.Status(http.StatusConflict).JSON(fiber.Map{"error": "User with this phone number already exists"})
	}

	// Hash the password with bcrypt before storing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error hashing the password"})
	}
	user.Password = string(hashedPassword)

	// Insert the user into the database
	_, err = service.InsertUser(user)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error creating user"})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{"message": "User created successfully"})
}

func Login(c *fiber.Ctx) error {
	var user model.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
	}

	// Check if the phone number exists
	existingUser := service.FindUserByPhoneNumber(user.PhoneNumber)
	if existingUser == nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"error": "User not registered"})
	}

	// Compare the hashed password
	err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password))
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": "Wrong password"})
	}

	tokenUser := service.ConvertUserToTokenUser(*existingUser)

	tokenString, err := serverutils.GenerateJWT(user, 1)
	if err != nil {
		fmt.Printf("Failed to generate JWT accessToken: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}
	tokenUser.AccessToken = tokenString

	return c.Status(http.StatusOK).JSON(tokenUser)
}

func Logout(c *fiber.Ctx) error {
	isLocal := os.Getenv("IS_LOCAL")
	if isLocal == "true" {
		log.Println("isLocal")
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    "tokenExpired",
			SameSite: "Lax",
			Expires:  time.Unix(0, 0),
		})
		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    "tokenExpired",
			SameSite: "Lax",
			Path:     "/api/auth/refresh",
			Expires:  time.Unix(0, 0),
		})

	} else {
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    "tokenExpired",
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
			Expires:  time.Unix(0, 0),
		})
		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    "tokenExpired",
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
			Path:     "/api/auth/refresh",
			Expires:  time.Unix(0, 0),
		})
	}

	// Return the new access accessToken
	return c.JSON(fiber.Map{})
}

func Refresh(c *fiber.Ctx) error {

	localClaims := c.Locals("user")
	user, err := serverutils.DecodeJWT(localClaims)
	userPtr := *user
	if err != nil {

		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "cant decode accessToken",
		})
	}

	// Validate the refresh accessToken (in a real application, this would involve database lookup)
	// For simplicity, let's assume any non-empty refresh accessToken is considered valid

	// Generate a new access accessToken
	newAccessToken, err := serverutils.GenerateJWT(userPtr, 1)
	newRefreshToken, err := serverutils.GenerateJWT(userPtr, 365)
	if err != nil {
		return err
	}

	isLocal := os.Getenv("IS_LOCAL")
	if isLocal == "true" {
		log.Println("isLocal")
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    newAccessToken,
			SameSite: "Lax",
		})
		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    newRefreshToken,
			SameSite: "Lax",
			Path:     "/api/auth/refresh",
		})

	} else {
		c.Cookie(&fiber.Cookie{
			Name:     "accessToken",
			Value:    newAccessToken,
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
		})
		c.Cookie(&fiber.Cookie{
			Name:     "refreshToken",
			Value:    newRefreshToken,
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
			Path:     "/api/auth/refresh",
		})
	}

	// Return the new access accessToken
	return c.JSON(fiber.Map{})

	// Invalid refresh accessToken
}
