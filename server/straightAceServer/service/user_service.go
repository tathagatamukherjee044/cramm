package service

import (
	"StraightAceServer/internal/database"
	"StraightAceServer/model"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpsertUser(user model.GoogleUser) error {
	collection := database.GetDBCollection("user") // Replace with your collection name

	// Check if the user already exists in the collection
	filter := bson.M{"email": user.Email}
	update := bson.M{"$set": user}

	opts := options.Update().SetUpsert(true)
	_, err := collection.UpdateOne(context.Background(), filter, update, opts)

	return err
}
