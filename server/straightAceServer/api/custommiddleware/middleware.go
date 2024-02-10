package custommiddleware

import (
	"StraightAceServer/internal/server"
	"log"

	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func SetupMiddlewares(s *server.FiberServer) {
	log.Println("serring up middleware")
	// Recovery middleware
	s.App.Use(recover.New())

	// Logger middleware
	s.App.Use(logger.New())

	// Request ID middleware
	// s.App.Use(requestid.New())

	// s.App.Use(cors.New(cors.Config{
	// 	AllowOrigins: "*",
	// 	AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	// 	AllowHeaders: "Origin, Content-Type, Accept",
	// }))

	s.App.Use(cors.New())

	// Timeout middleware
	//s.App.Use(timeout.New())

	// Custom JWT middleware
	//s.App.Use(validateJWT)
}
