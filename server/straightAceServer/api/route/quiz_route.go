package route

import (
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddQuizRouter(group fiber.Router) {
	quizRoute := group.Group("/quiz")
	quizRoute.Get("/gate", handler.GetQuiz)
	quizRoute.Post("/put", handler.CreateQuiz)
	quizRoute.Get("/all", handler.GetAllQuiz)
}
