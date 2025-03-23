package service

import (
	"fmt"
	"log"
	"time"

	"github.com/go-co-op/gocron"
)

func myFunction() {
	fmt.Println("Running myFunction at:", time.Now())
	// Your function logic here
}

func StartCronSchedule() {
	s := gocron.NewScheduler(time.UTC) //or time.Local
	log.Println("Scheduler started")
	s.Every(1).Day().At("02:00").Do(myFunction) // Schedule for 2:00 AM UTC or Local. User 24-hour format
	// s.Every(2).Minutes().Do(myFunction
	s.StartBlocking()
}
