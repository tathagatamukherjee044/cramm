package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GoogleUser struct {
	Email         string `json:"email" bson:"email"`
	Name          string `json:"name" bson:"name"`
	VerifiedEmail bool   `json:"verifiedEmail" bson:"verifiedEmail"`
}

type TokenUser struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email         string             `json:"email" bson:"email"`
	Name          string             `json:"name" bson:"name"`
	VerifiedEmail bool               `json:"verifiedEmail" bson:"verifiedEmail"`
	Role          string             `json:"role" bson:"role"`
	AccessToken   string             `json:"accessToken,omitempty" bson:"accessToken,omitempty"`
	RefreshToken  string             `json:"refreshToken,omitempty" bson:"refreshToken,omitempty"`
}

type User struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email             string             `json:"email" bson:"email"`
	Name              string             `json:"name" bson:"name"`
	VerifiedEmail     bool               `json:"verifiedEmail" bson:"verifiedEmail"`
	Role              string             `json:"role" bson:"role"`
	PhoneNumber       string             `json:"phoneNumber,omitempty" bson:"phoneNumber,omitempty"`
	Password          string             `json:"password,omitempty" bson:"password,omitempty"`
	Streak            int                `json:"streak" bson:"streak"`
	LastCompletedTime time.Time          `json:"lastCompletedTime" bson:"lastCompletedTime"`
	CreatedAt         time.Time          `json:"createdAt" bson:"createdAt"`
}

type Quiz struct {
	Prompt        string   `json:"prompt"`
	Choices       []Choice `json:"choices"`
	Answer        int      `json:"answer,omitempty"`
	Explanation   string   `json:"explanation,omitempty"`
	UserSubmitted bool     `json:"userSubmitted,omitempty"`
}

type Choice struct {
	Text  string `json:"text"`
	Type  string `json:"type,omitempty"`
	Index int    `json:"index"`
}

type Course struct {
	Subjects   []string `json:"subjects"`
	CourseName string   `json:"courseName"`
}
