package route

import (
	"StraightAceServer/api/custommiddleware"
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddUserRouter(group fiber.Router) {
	authRoute := group.Group("/user", custommiddleware.ValidateJWT)
	authRoute.Post("/me", handler.GetUser)
}
