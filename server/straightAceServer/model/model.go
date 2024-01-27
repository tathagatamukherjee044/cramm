package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type GoogleUser struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id"`
	Email string             `json:"email" bson:"email"`
	Name  string             `json:"name" bson:"name"`
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
	VerifiedEmail bool   `json:"verifiedEmail" bson:"verifiedEmail"`
	Role          string `json:"role" bson:"role"`
	PhoneNumber   string `json:"phoneNumber,omitempty" bson:"phoneNumber,omitempty"`
	Password      string `json:"password,omitempty" bson:"password,omitempty"`
}

type Quiz struct {
	Question      string   `json:"question"`
	Options       []string `json:"options"`
	CorrectOption int      `json:"correctOption,omitempty"`
}

type Course struct {
	Subjects []string
}
