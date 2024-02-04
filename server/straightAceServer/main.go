package main

// @title The Better Backend Template
// @version 0.1
// @description An example template of a Golang backend API using Fiber and MongoDB
// @contact.name Ben Davis
// @license.name MIT
// @host localhost:8080
// @BasePath /

import (
	"StraightAceServer/api/custommiddleware"
	"StraightAceServer/api/route"
	"StraightAceServer/internal/server"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

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

	currentTime := time.Now()

	// Add 2 hours
	newTime := currentTime.Add(2 * time.Hour)
	fmt.Println("Time after adding 2 hours:", newTime)

	// Subtract 30 minutes
	newTime = currentTime.Add(-30 * time.Minute)
	fmt.Println("Time after subtracting 30 minutes:", newTime)

	custommiddleware.SetupMiddlewares(server)
	route.RegisterFiberRoutes(server)
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	err := server.Listen(fmt.Sprintf("0.0.0.0:%d", port))
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
