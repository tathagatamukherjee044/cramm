package route

import (
	"StraightAceServer/api/controller"

	"github.com/gofiber/fiber/v2"
)

func NewAuthRouter(group fiber.Router) {
	group.Get("/login", controller.HelloWorldHandler)
}
