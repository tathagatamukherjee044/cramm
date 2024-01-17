package handler

import (
	"StraightAceServer/internal/store"
	model "StraightAceServer/model"
	"StraightAceServer/service"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
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
	fmt.Println(course, subject, seed)
	courseStructure := store.CoursesMap[course]
	fmt.Println(courseStructure.Subjects)
	var result []model.Quiz
	for i := 0; i < len(courseStructure.Subjects); i++ {
		quiz, err := service.GetQuiz(courseStructure.Subjects[i])
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "Invalid body",
			})
		}

		result = append(result, quiz...)
	}
	// quiz := &model.Quiz{
	// 	Question: "When did India gain Independence",
	// 	Options:  []string{"1947", "1950"},
	// }
	return c.JSON(result)
}

func GetAllQuiz(c *fiber.Ctx) error {
	quiz, _ := service.GetAllQuiz()
	return c.JSON(quiz)
}

func CreateQuiz(c *fiber.Ctx) error {
	log.Println("here in handelr")
	quiz := new(model.Quiz)
	if err := c.BodyParser(quiz); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	// create the book
	id, err := service.CreateQuiz(quiz)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   "Failed to create book",
			"message": err.Error(),
		})
	}

	// return the book
	return c.Status(201).JSON(fiber.Map{
		"result": id,
	})
}
