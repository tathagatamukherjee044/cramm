package route

import (
	"crammServer/api/custommiddleware"
	"crammServer/api/handler"

	"github.com/gofiber/fiber/v2"
)

func AddQuizRouter(group fiber.Router) {
	quizRoute := group.Group("/quiz", custommiddleware.DecodeJWT)
	quizRoute.Post("/completed", handler.QuizComplete)
	quizRoute.Post("/updateTime", handler.UpdateTime)
	quizRoute.Post("/add/:course", handler.CreateQuiz)
	quizRoute.Get("/all", handler.GetAllQuiz)
	quizRoute.Get("/:course/:sub/:seed", handler.GetQuiz)

}
