package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GoogleUser struct {
	//ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email string `json:"email" bson:"email"`
	Name  string `json:"name" bson:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail bool `json:"verifiedEmail" bson:"verifiedEmail"`
}

type TokenUser struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email string             `json:"email" bson:"email"`
	Name  string             `json:"name" bson:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verifiedEmail" bson:"verifiedEmail"`
	Role          string `json:"role" bson:"role"`
	Token         string `json:"token,omitempty" bson:"token,omitempty"`
}

type User struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email string             `json:"email" bson:"email"`
	Name  string             `json:"name" bson:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail     bool      `json:"verifiedEmail" bson:"verifiedEmail"`
	Role              string    `json:"role" bson:"role"`
	PhoneNumber       string    `json:"phoneNumber,omitempty" bson:"phoneNumber,omitempty"`
	Password          string    `json:"password,omitempty" bson:"password,omitempty"`
	Streak            int       `json:"streak" bson:"streak"`
	LastCompletedTime time.Time `json:"lastCompletedTime" bson:"lastCompletedTime"`
}

type Quiz struct {
	Prompt  string   `json:"prompt"`
	Choices []string `json:"choices"`
	Answer  string   `json:"answer,omitempty"`
}

type Course struct {
	Subjects []string
}
