package route

import (
	"StraightAceServer/api/custommiddleware"
	"StraightAceServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddQuizRouter(group fiber.Router) {
	quizRoute := group.Group("/quiz", custommiddleware.ValidateJWT)
	quizRoute.Get("/:course/:sub/:seed", handler.GetQuiz)
	quizRoute.Post("/put", handler.CreateQuiz)
	quizRoute.Get("/all", handler.GetAllQuiz)
}
