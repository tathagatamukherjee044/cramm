package service

import (
	"StraightAceServer/internal/database"
	model "StraightAceServer/model"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
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

func GetQuiz(subject string) ([]model.Quiz, error) {

	coll := database.GetDBCollection(subject)
	fmt.Println(coll)
	filter := bson.D{{}}
	var results []model.Quiz
	cursor, err := coll.Find(context.TODO(), filter)
	log.Println("here")
	log.Println(cursor)
	if err != nil {
		log.Println("0error")
		log.Println(err)
		return results, err
	}

	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Println("1error")
		log.Println(err)
		return results, err
	}

	log.Println(results)

	for _, result := range results {
		res, _ := json.Marshal(result)
		log.Println("no error")
		fmt.Println(string(res))
	}
	// return the book
	return results, nil
}

func CreateQuiz(quiz *model.Quiz) (interface{}, error) {

	coll := database.GetDBCollection("quiz")
	result, err := coll.InsertOne(context.TODO(), quiz)
	if err != nil {
		return nil, errors.New("Cannot Insert Quiz")
	}

	log.Println(result)
	// return the book
	return result.InsertedID, nil
}

func CalculateStreak(lastCompletedTime *time.Time, currentStreak *int) {
	lastCompletedDate := lastCompletedTime.Truncate(24 * time.Hour)
	currentDate := time.Now().Truncate(24 * time.Hour)
	// Compare the two dates
	fmt.Println(lastCompletedDate)
	if lastCompletedDate.Equal(currentDate) {
		fmt.Println("lastCompleted is today!")
	} else {
		fmt.Println("lastCompleted is not today.")
		*currentStreak++
		oneDayBefore := currentDate.AddDate(0, 0, -1)
		if lastCompletedDate.Before(oneDayBefore) {
			*currentStreak = 1

		}
	}
}
