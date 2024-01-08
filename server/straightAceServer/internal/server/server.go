package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"straight-Ace/internal/database"

	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port int
	db   database.Service
}

func NewServer() *http.Server {
	port := os.Getenv("PORT")
	log.Printf(port)
	pp, _ := strconv.Atoi(port)
	NewServer := &Server{
		port: pp,
		db:   database.New(),
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
