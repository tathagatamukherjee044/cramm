package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type GoogleUser struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id"`
	Email string             `json:"email"`
	Name  string             `json:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail bool `json:"verified_email"`
}

type TokenUser struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id"`
	Email string             `json:"email"`
	Name  string             `json:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
	Role          string `json:"role"`
	Token         string `json:"token,omitempty"`
}

type User struct {
	ID    primitive.ObjectID `json:"_id" bson:"_id"`
	Email string             `json:"email"`
	Name  string             `json:"name"`
	//Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
	Role          string `json:"role"`
}

type Quiz struct {
	Question      string   `json:"question"`
	Options       []string `json:"options"`
	CorrectOption int      `json:"correctOption,omitempty"`
}

type Course struct {
	Subjects []string
}
