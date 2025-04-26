package handler

import (
	"crammServer/internal/serverutils"
	"crammServer/internal/store"
	model "crammServer/model"
	"crammServer/service"
	"fmt"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type Question struct {
	ID       string   `json:"id"`
	Question string   `json:"question"`
	Options  []string `json:"options"`
	Extra    string   `json:"bs"`
}

func GetQuiz(c *fiber.Ctx) error {

	course := c.Params("course")
	subject := c.Params("sub")
	seed := c.Params("seed")
	totalQuestions := 10
	fmt.Println(course, subject, seed)
	log.Println(store.CoursesMap)
	courseStructure := store.CoursesMap[course]
	fmt.Println(courseStructure.Subjects)
	var result []model.Quiz

	// this is to distribute the questions as evenly as possible
	remainder := totalQuestions % len(courseStructure.Subjects)
	quotient := totalQuestions / len(courseStructure.Subjects)
	for i := 0; i < len(courseStructure.Subjects); i++ {
		fmt.Println(courseStructure.Subjects[i])
		quiz, err := service.GetQuiz(courseStructure.Subjects[i], quotient+IsRemainderZero(&remainder))
		if err != nil {
			log.Println(err)
			return c.Status(400).JSON(fiber.Map{
				"error": "Something went Wrong",
			})
		}

		result = append(result, quiz...)
	}
	fmt.Println("reached here")
	// quiz := &model.Quiz{
	// 	Question: "When did India gain Independence",
	// 	Options:  []string{"1947", "1950"},
	// }
	// c.Cookie(&fiber.Cookie{
	// 	Name:  "anotherCookie",
	// 	Value: "anotherValue",
	// 	// HTTPOnly: false,
	// 	SameSite: "Lax",
	// })
	return c.Status(200).JSON(result)
}

func IsRemainderZero(remainder *int) int {
	*remainder--
	if *remainder+1 == 0 {
		return 0
	} else {
		return 1
	}
}

func GetAllQuiz(c *fiber.Ctx) error {
	quiz, _ := service.GetAllQuiz()
	return c.JSON(quiz)
}

func CreateQuiz(c *fiber.Ctx) error {
	course := c.Params("course")
	// subject := c.Params("sub")
	log.Println("here in handelr")
	quiz := new(model.Quiz)
	log.Println(quiz)
	if err := c.BodyParser(&quiz); err != nil {
		log.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	quiz.UserSubmitted = true
	id, err := service.CreateQuiz(quiz, course)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   "Failed to create book",
			"message": err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"result": id,
	})
}

func UpdateTime(c *fiber.Ctx) error {
	localClaims := c.Locals("user")
	if localClaims == false {
		return c.Status(401).JSON(fiber.Map{
			"message": "We could not save your progress because you are not logged in",
		})
	}
	user, err := serverutils.DecodeJWT(localClaims)
	if err != nil {

		fmt.Println(err)
		return c.Status(401).JSON(fiber.Map{
			"error":   "cant decode accessToken",
			"message": err.Error(),
		})
	}

	log.Println(user.ID)

	dbUser := service.FindUserByID(user.ID.Hex())

	fmt.Println(dbUser)

	currentStreak := dbUser.Streak
	lastCompletedTime := dbUser.LastCompletedTime

	service.CalculateStreak(&lastCompletedTime, &currentStreak)

	update := bson.M{
		"$set": bson.M{
			"lastCompletedTime": time.Now(),
			// add other fields to update...
		},
	}

	err = service.UpdateUserByID(user.ID.Hex(), update)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "something went wrong",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Congratulation on completing your lesson",
	})
}

func QuizComplete(c *fiber.Ctx) error {
	localClaims := c.Locals("user")
	if localClaims == false {
		return c.Status(401).JSON(fiber.Map{
			"message": "We could not save your progress because you are not logged in",
		})
	}
	user, err := serverutils.DecodeJWT(localClaims)
	if err != nil {

		fmt.Println(err)
		return c.Status(401).JSON(fiber.Map{
			"error":   "cant decode accessToken",
			"message": err.Error(),
		})
	}

	log.Println(user.ID)

	dbUser := service.FindUserByID(user.ID.Hex())

	fmt.Println(dbUser)

	currentStreak := dbUser.Streak
	lastCompletedTime := dbUser.LastCompletedTime

	service.CalculateStreak(&lastCompletedTime, &currentStreak)

	update := bson.M{
		"$set": bson.M{
			"streak":            currentStreak,
			"lastCompletedTime": time.Now(),
			// add other fields to update...
		},
	}

	err = service.UpdateUserByID(user.ID.Hex(), update)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "something went wrong",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Congratulation on completing your lesson",
	})
}
