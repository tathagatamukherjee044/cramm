package database

import (
	"context"
	"fmt"
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Service interface {
	Health() map[string]string
}

var client *mongo.Client
var db *mongo.Database

var (
	host = os.Getenv("DB_HOST")
	port = os.Getenv("DB_PORT")
	//database = os.Getenv("DB_DATABASE")
)

func New() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%s", host, port)))

	if err != nil {
		log.Fatal(err)

	}
	db = client.Database("straightAceDev")

}

func GetDBCollection(col string) *mongo.Collection {
	return db.Collection(col)
}

// func (s *service) Health() map[string]string {
// 	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
// 	defer cancel()

// 	err := s.client.Ping(ctx, nil)
// 	if err != nil {
// 		log.Fatalf(fmt.Sprintf("client down: %v", err))
// 	}

// 	return map[string]string{
// 		"message": "It's healthy",
// 	}
// }
