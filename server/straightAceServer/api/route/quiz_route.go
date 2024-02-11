package route

import (
	"StraightAceServer/api/custommiddleware"
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddQuizRouter(group fiber.Router) {
	quizRoute := group.Group("/quiz", custommiddleware.DecodeJWT)
	quizRoute.Post("/completed", handler.QuizComplete)
	quizRoute.Post("/put", handler.CreateQuiz)
	quizRoute.Get("/all", handler.GetAllQuiz)
	quizRoute.Get("/:course/:sub/:seed", handler.GetQuiz)

}
