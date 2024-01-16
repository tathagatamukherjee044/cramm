package handler

import (
	model "StraightAceServer/model"
	"StraightAceServer/service"
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
	quiz := &model.Quiz{
		ID:       "1",
		Question: "When did India gain Independence",
		Options:  []string{"1947", "1950"},
	}
	return c.JSON(quiz)
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
