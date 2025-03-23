package handler

import (
	"crammServer/internal/store"
	"log"

	"github.com/gofiber/fiber/v2"
)

func GetSubjectList(c *fiber.Ctx) error {
	log.Println(store.CoursesMap)
	return c.Status(200).JSON(fiber.Map{
		"courses": store.CoursesMap,
	})
}
