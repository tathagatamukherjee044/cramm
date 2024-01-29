package route

import (
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddAuthRouter(group fiber.Router) {
	authRoute := group.Group("/auth")
	authRoute.Post("/login", handler.Login)
	authRoute.Post("/signup", handler.Signup)
	authRoute.Get("/oauth/google", handler.GoogleOAuthHandler)
	authRoute.Get("test", func(c *fiber.Ctx) error {
		return c.SendString("Hello World programmed to work and not to feel")
	})
	// http.HandleFunc("/auth/oauth/google", handleGoogleLogin)
}
