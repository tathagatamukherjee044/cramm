package route

import (
	"crammServer/api/custommiddleware"
	"crammServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddUserRouter(group fiber.Router) {
	authRoute := group.Group("/user", custommiddleware.DecodeJWT)
	authRoute.Get("/me", handler.GetUser)
}
