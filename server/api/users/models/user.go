package user_models

import "time"

type (
	User struct {
		ID        string `json:"id" bson:"_id,omitempty"`
		FirstName string `json:"first_name" bson:"firstName,omitempty"`
		LastName  string `json:"last_name" bson:"lastName,omitempty"`

		Email string `json:"email" validate:"required,email" errormgs:"Email is required and must be a valid email address"`

		Password string `json:"password" validate:"required,min=6,max=20" errormgs:"Password is required and must be between 6 and 20 characters" bson:"password"`

		GeneralRole string `json:"general_role" bson:"generalRole,omitempty" validate:"required" errormgs:"Platform role is needed either company or candidate"` //This can be either "candidate" or "company"

		CreatedAt time.Time `json:"createdAt" bson:"createdAt,omitempty"`
		UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt,omitempty"`
		DeletedAt time.Time `json:"deletedAt" bson:"deletedAt,omitempty"`
	}
)
