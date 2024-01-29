package custommiddleware

import (
	"StraightAceServer/internal/server"
	"log"

	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func SetupMiddlewares(s *server.FiberServer) {
	log.Println("serring up middleware")
	// Recovery middleware
	s.App.Use(recover.New())

	// Logger middleware
	s.App.Use(logger.New())

	// Request ID middleware
	s.App.Use(requestid.New())

	s.App.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Timeout middleware
	//s.App.Use(timeout.New())

	// Custom JWT middleware
	//s.App.Use(validateJWT)
}
