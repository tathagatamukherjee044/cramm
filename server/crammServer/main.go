package main

// @title The Better Backend Template
// @version 0.1
// @description An example template of a Golang backend API using Fiber and MongoDB
// @contact.name Ben Davis
// @license.name MIT
// @host localhost:8080
// @BasePath /

import (
	"crammServer/api/custommiddleware"
	"crammServer/api/route"
	"crammServer/internal/server"
	"crammServer/service"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func main() {

	godotenv.Load("../.env")
	log.Println(os.Getenv("PORT"))
	server := server.New()

	objectID := primitive.NewObjectID()

	// Convert ObjectID to string
	objectIDString := objectID.Hex()

	fmt.Printf("Original ObjectID: %s\n", objectID)
	fmt.Printf("ObjectID as string: %s\n", objectIDString)

	go service.StartCronSchedule() // start the cron schedule

	custommiddleware.SetupMiddlewares(server)
	route.RegisterFiberRoutes(server)
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	// proxyPort, _ := strconv.Atoi(os.Getenv("PROXY_PORT"))
	// if os.Getenv("APP_ENV") == "local" {
	// 	fmt.Println("Running proxy for local development")
	// 	server.Use("/api", proxy.Forward(fmt.Sprintf("http://localhost:%d", proxyPort))) // Proxy to Angular
	// } else {
	// 	fmt.Println("Not running proxy (production or other environment)")
	// }

	// server.Get("/", func(c *fiber.Ctx) error {
	// 	return c.SendString("Hello from Angular proxy!")
	// })

	fmt.Printf("Server listening on %d\n", port)
	err := server.Listen(fmt.Sprintf("0.0.0.0:%d", port))
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
