package custommiddleware

import (
	"crammServer/internal/serverutils"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func ValidateJWT(c *fiber.Ctx) error {
	fmt.Println("in validate JWT")
	authFailed := c.Locals("authFailed")
	authFailReason := c.Locals("authFailReason")
	if authFailed == true {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": authFailReason})
	}

	return c.Next()
}

func DecodeJWT(c *fiber.Ctx) error {
	c.Locals("user", false)
	log.Println("in decode jwt")
	authCookie := c.Cookies("accessToken")
	if authCookie == "" {
		c.Locals("authFailed", true)
		c.Locals("authFailReason", "Missing Authorization header")
		return c.Next()
		// return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing Authorization header"})
	}

	// The accessToken is typically in the format "Bearer <accessToken>"
	// Split the header to get the actual accessToken

	jwtToken := authCookie

	// Validate the JWT accessToken
	claims, err := serverutils.VerifyJWT(jwtToken)
	if err != nil {

		c.Locals("authFailed", true)
		c.Locals("authFailReason", "Unauthorized")
		return c.Next()
	}

	// // Set the user ID from the JWT claims in the context for later use
	c.Locals("user", claims)

	// Continue with the next middleware or route handler
	// return ValidateJWT(c)
	return c.Next()
}

func ValidateRefresh(c *fiber.Ctx) error {
	log.Println("in jwt")
	// Extract JWT accessToken from Authorization header
	refreshCookie := c.Cookies("refreshToken")
	if refreshCookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing Authorization header"})
	}

	jwtToken := refreshCookie

	// Validate the JWT accessToken
	claims, err := serverutils.VerifyJWT(jwtToken)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "invalidRefresh",
		})
	}

	// // Set the user ID from the JWT claims in the context for later use
	c.Locals("user", claims)

	fmt.Println("CLAIMS", claims)

	// Continue with the next middleware or route handler
	return c.Next()
}
