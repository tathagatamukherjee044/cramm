package handler

import (
	"github.com/gofiber/fiber/v2"
)

type Question struct {
	ID       string   `json:"id"`
	Question string   `json:"question"`
	Options  []string `json:"options"`
	Extra    string   `json:"bs"`
}

func GetQuiz(c *fiber.Ctx) error {
	question := &Question{
		ID:       "1",
		Question: "When did India gain Independence",
		Options:  []string{"1947", "1950"},
	}
	return c.JSON(question)
}
