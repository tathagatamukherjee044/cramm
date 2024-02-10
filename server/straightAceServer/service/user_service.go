package service

import (
	"StraightAceServer/internal/database"
	"StraightAceServer/model"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UpsertUser(googleUser model.User) (upsertedID string, err error) {
	collection := database.GetDBCollection("users")

	// Check if the user already exists in the collection
	filter := bson.M{"email": googleUser.Email}
	update := bson.M{"$set": bson.M{
		"name":          googleUser.Name,
		"verifiedEmail": googleUser.VerifiedEmail,
	}}

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
		upsertedID = result.UpsertedID.(primitive.ObjectID).Hex()
	}

	fmt.Println("Matched Count:", result.MatchedCount)
	// fmt.Println("Upserted ID:", upsertedID)

	return upsertedID, nil
}

func InsertUser(user model.User) (string, error) {
	collection := database.GetDBCollection("users")
	inseredtUser, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return "", err
	}
	upsertedID := inseredtUser.InsertedID.(primitive.ObjectID).Hex()
	return upsertedID, nil
}

func UpdateUserByID(ID string, updateFields bson.M) (err error) {
	fmt.Println(ID)
	collection := database.GetDBCollection("users")
	objID, _ := primitive.ObjectIDFromHex(ID)
	fmt.Println(objID)
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": objID}, updateFields)
	if err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println("success")
	return nil
}

func FindUserByPhoneNumber(phoneNumber string) *model.User {
	collection := database.GetDBCollection("users")
	var user model.User
	err := collection.FindOne(context.Background(), bson.M{"phoneNumber": phoneNumber}).Decode(&user)
	if err != nil {
		return nil
	}
	return &user
}

func FindUserByEmail(email string) *model.User {
	collection := database.GetDBCollection("users")
	var user model.User
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		return nil
	}
	return &user
}

func FindUserByID(ID string) *model.User {
	fmt.Println(ID)
	collection := database.GetDBCollection("users")
	var user model.User
	objID, _ := primitive.ObjectIDFromHex(ID)
	fmt.Println(objID)
	err := collection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	fmt.Println("success")
	return &user
}

func ConvertGoogleUserToUser(googleUser model.GoogleUser) model.User {
	fmt.Println(googleUser)
	User := &model.User{
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
