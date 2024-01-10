package main

import (
	"StraightAceServer/api/route"
	"StraightAceServer/internal/server"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
)

func main() {

	godotenv.Load("../.env")
	log.Println(os.Getenv("PORT"))
	server := server.New()

	route.RegisterFiberRoutes(server)
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	err := server.Listen(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
