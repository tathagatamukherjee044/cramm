package route

import (
	"crammServer/api/custommiddleware"
	"crammServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddSubjectRouter(group fiber.Router) {
	authRoute := group.Group("/subject", custommiddleware.DecodeJWT)
	authRoute.Get("/list", handler.GetSubjectList)
}
