package custommiddleware

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func validateJWT(c *fiber.Ctx) error {
	log.Println("in jwt")
	// Extract the JWT token from the request cookie
	// cookie := c.Cookies("token")
	// if cookie == "" {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"message": "Unauthorized",
	// 	})
	// }

	// // Validate the JWT token
	// claims, err := serverutils.VerifyJWT(cookie)
	// if err != nil {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"message": "Unauthorized",
	// 	})
	// }

	// // Set the user ID from the JWT claims in the context for later use
	// c.Locals("userID", claims.UserID)

	// Continue with the next middleware or route handler
	return c.Next()
}
