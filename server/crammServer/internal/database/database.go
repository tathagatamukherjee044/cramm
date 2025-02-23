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
	dbUrl = os.Getenv("DB_URL")
	port  = os.Getenv("DB_PORT")
	//database = os.Getenv("DB_DATABASE")
)

func New() {
	fmt.Println("db connected at :", dbUrl)
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(dbUrl))

	if err != nil {
		log.Fatal(err)

	}
	db = client.Database("cramm")

}

func GetDBCollection(col string) *mongo.Collection {
	return db.Collection(col)

}

func GetAllCollections() ([]string, error) {
	collectionNames, err := db.ListCollectionNames(context.Background(), nil)
	if err != nil {
		return []string{}, err
	}
	return collectionNames, nil
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
