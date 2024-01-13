package service

import (
	"StraightAceServer/internal/database"
	model "StraightAceServer/model"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllQuiz() ([]model.Quiz, error) {

	coll := database.GetDBCollection("quiz")
	filter := bson.D{{}}
	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	var results []model.Quiz
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	for _, result := range results {
		res, _ := json.Marshal(result)
		fmt.Println(string(res))
	}
	// return the book
	return results, nil
}

func CreateQuiz(quiz *model.Quiz) (*mongo.InsertOneResult, error) {

	coll := database.GetDBCollection("quiz")
	result, err := coll.InsertOne(context.TODO(), quiz)
	if err != nil {
		return &mongo.InsertOneResult{}, errors.New("Cannot Insert Quiz")
	}

	log.Println(result)
	// return the book
	return result, nil
}
