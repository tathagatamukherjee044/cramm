package route

import (
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddAuthRouter(group fiber.Router) {
	authRoute := group.Group("/auth")
	authRoute.Get("/login", handler.HelloWorldHandler)
	authRoute.Get("/oauth/google", handler.GoogleOAuthHandler)
}
