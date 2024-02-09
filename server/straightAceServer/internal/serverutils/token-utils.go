package serverutils

import (
	"StraightAceServer/model"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JWTClaims struct {
	User model.User `json:"user"`
	jwt.StandardClaims
}

var (
	secretKey = []byte("your-secret-key")
)

func GenerateJWT(user model.User, days time.Duration) (string, error) {
	fmt.Println(days)
	claims := JWTClaims{
		User: user,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(days * time.Hour * 24).Unix(), // Adjust expiration as needed
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := accessToken.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func GenerateREF(user model.User, days time.Duration) (string, error) {
	fmt.Println(days)
	claims := JWTClaims{
		User: user,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(), // Adjust expiration as needed
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := accessToken.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWT(tokenString string) (*JWTClaims, error) {
	claims := &JWTClaims{}
	accessToken, err := jwt.ParseWithClaims(tokenString, claims, func(accessToken *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !accessToken.Valid {
		return nil, fmt.Errorf("Invalid accessToken")
	}

	return claims, nil
}

func DecodeJWT(c interface{}) (*model.User, error) {
	fmt.Println("here in deocde")
	fmt.Println(c)
	userClaims, ok := c.(*JWTClaims)
	if !ok {
		fmt.Println(userClaims)
		var userPointer *model.User
		userPointer = nil
		return userPointer, fmt.Errorf("Cant Decode JWT")
	}

	// Access user ID from claims
	userID := userClaims.User.Name

	fmt.Println(userID)

	return &userClaims.User, nil
}
