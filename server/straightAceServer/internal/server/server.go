package server

import (
	"crammServer/internal/database"

	"github.com/gofiber/fiber/v2"
)

type FiberServer struct {
	*fiber.App
	client database.Service
}

func New() *FiberServer {
	app := fiber.New()
	server := &FiberServer{
		App: app,
	}
	database.New()
	//service.GetGoogleConfig()
	return server
}
