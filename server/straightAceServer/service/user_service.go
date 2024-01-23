package service

import (
	"StraightAceServer/internal/database"
	"StraightAceServer/model"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpsertUser(googleUser model.GoogleUser) (upsertedID string, err error) {
	collection := database.GetDBCollection("user")

	jsonObject := map[string]interface{}{
		"name":  "John Doe",
		"age":   30,
		"email": googleUser.Email,
	}

	// Check if the user already exists in the collection

	filter := bson.M{"email": googleUser.Email}
	update := bson.M{"$set": jsonObject}

	opts := options.Update().SetUpsert(true)
	result, err := collection.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		fmt.Println("fail in update one")
		fmt.Println(err)
		return "", err

	}

	// If UpsertedID is nil, use the filter to find the existing document's ID
	if result.UpsertedID == nil {
		var existingDoc model.User
		err := collection.FindOne(context.Background(), filter).Decode(&existingDoc)
		if err != nil {
			fmt.Println("fail in find one")

			return "", err
		}
		log.Println(existingDoc)
		upsertedID = existingDoc.ID.Hex()
	} else {
		upsertedID = result.UpsertedID.(string)
	}

	fmt.Println("Matched Count:", result.MatchedCount)
	// fmt.Println("Upserted ID:", upsertedID)

	return upsertedID, nil
}

func ConvertGoogleUserToUser(googleUser model.GoogleUser) model.User {
	fmt.Println(googleUser)
	User := &model.User{
		ID:            googleUser.ID,
		Email:         googleUser.Email,
		Role:          "student",
		VerifiedEmail: googleUser.VerifiedEmail,
		Name:          googleUser.Name,
		// Set the default role or fetch it from somewhere else
		// map other fields as needed
	}
	fmt.Println(User)
	return *User
}

func ConvertUserToTokenUser(googleUser model.User) model.TokenUser {
	fmt.Println(googleUser)
	User := &model.TokenUser{
		ID:            googleUser.ID,
		Email:         googleUser.Email,
		Role:          "student",
		VerifiedEmail: googleUser.VerifiedEmail,
		Name:          googleUser.Name,
		// Set the default role or fetch it from somewhere else
		// map other fields as needed
	}
	fmt.Println(User)
	return *User
}
