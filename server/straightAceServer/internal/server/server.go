package server

import (
	"StraightAceServer/internal/database"

	"github.com/gofiber/fiber/v2"
)

type FiberServer struct {
	*fiber.App
	client database.Service
}

func New() *FiberServer {
	server := &FiberServer{
		App: fiber.New(),
	}
	database.New()
	//service.GetGoogleConfig()
	return server
}
