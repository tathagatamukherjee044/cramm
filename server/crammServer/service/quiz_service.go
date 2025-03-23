package service

import (
	"context"
	"crammServer/internal/database"
	model "crammServer/model"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllQuiz() ([]model.Quiz, error) {

	coll := database.GetDBCollection("quiz")
	filter := bson.D{{}}
	cursor, err := coll.Find(context.TODO(), filter, options.Find().SetLimit(10))
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
		fmt.Println(string(res))
	}
	// return the book
	return results, nil
}

func GetQuiz(subject string, limit int) ([]model.Quiz, error) {

	coll := database.GetDBCollection(subject)
	fmt.Println(coll)
	filter := bson.D{{}}
	var results []model.Quiz
	cursor, err := coll.Find(context.TODO(), filter, options.Find().SetLimit(int64(limit)))
	if err != nil {
		log.Println(err)
		return results, err
	}

	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Println(err)
		return results, err
	}

	// log.Println(results)

	for _, result := range results {
		json.Marshal(result)
	}

	ShuffleChoices(results)
	// return the book
	return results, nil
}

func CreateQuiz(quiz *model.Quiz, subject string) (interface{}, error) {

	coll := database.GetDBCollection(subject)
	result, err := coll.InsertOne(context.TODO(), quiz)
	if err != nil {
		return nil, errors.New("cannot insert quiz")
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
		twoDayBefore := currentDate.AddDate(0, 0, -2)
		if lastCompletedDate.Before(oneDayBefore) && lastCompletedDate.After(twoDayBefore) {
			*currentStreak = 1
		} else if lastCompletedDate.Before(twoDayBefore) {
			log.Println("lastCompleted is two days before")
			*currentStreak = 0
		}
	}
}

func ShuffleChoices(questions []model.Quiz) {
	r := rand.New(rand.NewSource(time.Now().UnixNano())) // Create a local random generator

	for i := range questions {
		choices := questions[i].Choices
		for j := range choices {
			// Generate a random index
			k := r.Intn(len(choices))
			// Swap the elements at j and k
			choices[j], choices[k] = choices[k], choices[j]
		}
		questions[i].Choices = choices
	}
}
