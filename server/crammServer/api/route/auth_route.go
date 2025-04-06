package route

import (
	"crammServer/api/custommiddleware"
	"crammServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddAuthRouter(group fiber.Router) {
	authRoute := group.Group("/auth")
	authRoute.Post("/login", handler.Login)
	authRoute.Post("/logout", custommiddleware.DecodeJWT, custommiddleware.ValidateJWT, handler.Logout)
	authRoute.Post("/refresh", custommiddleware.ValidateRefresh, handler.Refresh)
	authRoute.Post("/signup", handler.Signup)
	authRoute.Get("/oauth/google", handler.GoogleOAuthHandler)
	authRoute.Get("/test", func(c *fiber.Ctx) error {
		return c.SendString("Hello World programmed to work and not to feel")
	})
	// http.HandleFunc("/auth/oauth/google", handleGoogleLogin)
}
