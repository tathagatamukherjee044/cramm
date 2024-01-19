package handler

import (
	"StraightAceServer/service"
	"fmt"

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

	return c.JSON(user)

}
