package user_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	User struct {
		Id        primitive.ObjectID `json:"id,omitempty"`
		Name      string             `json:"name" validate:"required,min=3,max=20" errormgs:"Name is required and must be between 3 and 20 characters"`
		Email     string             `json:"email" validate:"required,email" errormgs:"Email is required and must be a valid email address"`
		Password  string             `json:"password"`
		CreatedAt time.Time          `json:"created_at"`
		UpdatedAt time.Time          `json:"updated_at"`
	}
)
