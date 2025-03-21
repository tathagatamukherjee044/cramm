package handler

import (
	"crammServer/internal/serverutils"
	"crammServer/service"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func GetUser(c *fiber.Ctx) error {
	// return c.Status(200).JSON(fiber.Map{
	// 	"streak":  1,
	// 	"message": "Congratulation on completing your lesson",
	// })

	authFailed := c.Locals("authFailed")
	if authFailed == true {
		return c.Status(401).JSON(fiber.Map{
			"message": c.Locals("authFailReason"),
		})
	}

	localClaims := c.Locals("user")
	if localClaims == false {
		return c.Status(401).JSON(fiber.Map{
			"message": "No User found",
		})
	}
	user, err := serverutils.DecodeJWT(localClaims)
	if err != nil {

		fmt.Println(err)
		return c.Status(401).JSON(fiber.Map{
			"error": "cant decode accessToken",
		})
	}
	log.Println(user.ID)

	dbUser := service.FindUserByID(user.ID.Hex())

	service.CalculateStreak(&dbUser.LastCompletedTime, &dbUser.Streak)
	log.Println(dbUser)
	isLocal := os.Getenv("IS_LOCAL")
	if isLocal == "true" {
		log.Println("isLocal")
		c.Cookie(&fiber.Cookie{
			Name:  "myCookie",
			Value: "cookieValue",
			// HTTPOnly: true,
			SameSite: "Lax",
		})

	} else {
		c.Cookie(&fiber.Cookie{
			Name:     "myCookie",
			Value:    "cookieValue",
			HTTPOnly: true,     // Recommended for security
			Secure:   true,     // Recommended for HTTPS
			SameSite: "Strict", // Recommended for security
		})

		c.Cookie(&fiber.Cookie{
			Name:     "anotherCookie",
			Value:    "anotherValue",
			HTTPOnly: false,
			Secure:   true,
			SameSite: "Lax",
		})
	}

	log.Println(c.Cookies("myCookie"))
	log.Println(c.Cookies("anotherCookie"))

	log.Println("Headers after setting cookies:", c.GetRespHeaders())

	return c.Status(200).JSON(fiber.Map{
		"streak":  dbUser.Streak,
		"message": "",
	})
}
