package handler

import (
	"StraightAceServer/internal/serverutils"
	"StraightAceServer/service"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
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

	user, _ := service.GetGoogleUser(token)

	if err := service.UpsertUser(user); err != nil {
		fmt.Printf("Failed to upsert user: %v\n", err)
		return nil
	}

	tokenString, err := serverutils.GenerateJWT(user.ID)
	if err != nil {
		fmt.Printf("Failed to generate JWT token: %v\n", err)
		return c.Status(401).SendString(err.Error())
	}

	log.Println(tokenString)

	return c.JSON(user)

}
