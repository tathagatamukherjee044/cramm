package handler

import (
	"StraightAceServer/internal/serverutils"
	"StraightAceServer/service"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	upsertedID, rerr := service.UpsertUser(googleUser)
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

	user := service.ConvertGoogleUserToUser(googleUser)

	tokenString, err := serverutils.GenerateJWT(user)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}
	log.Println("Here is user")
	log.Println(user)

	log.Println(tokenString)

	return c.JSON(user)

}
