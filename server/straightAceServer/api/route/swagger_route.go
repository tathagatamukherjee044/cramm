package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"

	_ "StraightAceServer/docs"
)

func AddSwaggerRoutes(group fiber.Router) {
	// setup swagger
	group.Get("/secret-tunnel/*", swagger.HandlerDefault)
}
