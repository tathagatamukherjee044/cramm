package future

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type YourDocument struct {
	ID    int    `bson:"_id"`
	Name  string `bson:"name"`
	Value int    `bson:"value"`
	// Add other fields as needed
}

func main() {
	// Set the seed based on some factor (e.g., current time)
	seed := time.Now().UnixNano()
	rand.Seed(seed)

	// Initialize MongoDB client
	client, err := mongo.NewClient(options.Client().ApplyURI("your-mongo-connection-string"))
	if err != nil {
		log.Fatal(err)
	}

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Access your MongoDB collection
	collection := client.Database("your-database").Collection("your-collection")

	// Define your query with a random field based on the seed
	query := bson.M{
		"randomField": rand.Float64(), // Generate a random number between 0 and 1
	}

	// Use the $sample operator to get random entries
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{
		{{"$match", query}},
		{{"$sample", bson.D{{"size", 5}}}}, // Adjust the size as needed
	})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)

	// Iterate through the result cursor
	var results []YourDocument
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatal(err)
	}

	// Print the random entries
	fmt.Println("Random Entries:")
	for _, result := range results {
		fmt.Printf("ID: %d, Name: %s, Value: %d\n", result.ID, result.Name, result.Value)
	}
}
