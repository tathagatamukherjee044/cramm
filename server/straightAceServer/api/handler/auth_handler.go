package handler

import (
	"StraightAceServer/internal/serverutils"
	"StraightAceServer/model"
	"StraightAceServer/service"
	"fmt"
	"log"
	"net/http"

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
	token, err := service.GetGoogleToken(codeValue)
	if err != nil {
		return c.Status(401).SendString("Error getting token from code.")
	}

	googleUser, _ := service.GetGoogleUser(token)

	fmt.Println("google user", googleUser)

	user := service.ConvertGoogleUserToUser(googleUser)

	upsertedID, rerr := service.UpsertUser(user)
	if rerr != nil {
		fmt.Printf("Failed to upsert user: %v\n", err)
		return nil
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

	googleUser.ID = objectID

	tokenUser := service.ConvertUserToTokenUser(user)

	tokenString, err := serverutils.GenerateJWT(user)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}
	log.Println("Here is user")
	log.Println(user)

	log.Println(tokenString)

	tokenUser.Token = tokenString

	return c.JSON(tokenUser)

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
	err = service.InsertUser(user)
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

	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Login successful"})
}
