package user_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	User struct {
		Id primitive.ObjectID `json:"id,omitempty"`

		FirstName string `json:"first_name" validate:"required,min=3,max=20" errormgs:"First name is required and must be between 3 and 20 characters"`

		LastName string `json:"last_name" validate:"required,min=3,max=20" errormgs:"Last name is required and must be between 3 and 20 characters"`

		Email string `json:"email" validate:"required,email" errormgs:"Email is required and must be a valid email address"`

		Password  string    `json:"password"`
		CreatedAt time.Time `json:"created_at"`
		UpdatedAt time.Time `json:"updated_at"`
	}
)
