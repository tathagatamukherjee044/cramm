package custommiddleware

import (
	"StraightAceServer/internal/serverutils"
	"fmt"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func ValidateJWT(c *fiber.Ctx) error {
	log.Println("in jwt")
	// Extract JWT token from Authorization header
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing Authorization header"})
	}

	// The token is typically in the format "Bearer <token>"
	// Split the header to get the actual token
	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || strings.ToLower(tokenParts[0]) != "bearer" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid Authorization header format"})
	}

	jwtToken := tokenParts[1]

	// Validate the JWT token
	claims, err := serverutils.VerifyJWT(jwtToken)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// // Set the user ID from the JWT claims in the context for later use
	c.Locals("user", claims)

	fmt.Println("CLAIMS", claims)

	// Continue with the next middleware or route handler
	return c.Next()
}
