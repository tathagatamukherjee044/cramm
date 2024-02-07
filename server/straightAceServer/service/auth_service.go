package service

import (
	model "StraightAceServer/model"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOauthConfig *oauth2.Config
	oauthStateString  = "random" // Replace with a random string for security
)

const (
	googleAPIURL = "https://www.googleapis.com/oauth2/v2/userinfo"
)

// User struct to store user information

func GetGoogleConfig() {
	log.Println("making google config")
	googleOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv(`GOOGLE_CLIENT_ID`),
		ClientSecret: os.Getenv(`GOOGLE_CLIENT_SECRET`),
		RedirectURL:  os.Getenv(`GOOGLE_OAUTH_REDIRECT_URL`),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}

func GetGoogleToken(code string) (*oauth2.Token, error) {
	GetGoogleConfig()
	log.Println(code)
	log.Println("here in service")
	log.Println(string(googleOauthConfig.ClientID))
	accessToken, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Printf("Code exchange failed: %v\n", err)
	}
	return accessToken, err
}

func GetGoogleUser(accessToken *oauth2.Token) (model.GoogleUser, error) {
	GetGoogleConfig()
	client := googleOauthConfig.Client(context.Background(), accessToken)
	response, err := client.Get(googleAPIURL)
	if err != nil {
		fmt.Printf("Failed to get user info: %v\n", err)
	}

	var user model.GoogleUser
	err = json.NewDecoder(response.Body).Decode(&user)
	if err != nil {
		fmt.Printf("Failed to decode user info: %v\n", err)
	}
	return user, err
}
