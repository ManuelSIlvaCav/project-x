package companies_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	CompanyUserProfile struct {
		ID        string              `json:"id" bson:"_id,omitempty"`
		CompanyID *primitive.ObjectID `bson:"companyId" json:"companyId"`
		UserID    *primitive.ObjectID `bson:"userId" json:"userId"`
		CreatedAt time.Time           `json:"createdAt" bson:"createdAt,omitempty"`
		UpdatedAt time.Time           `json:"updatedAt" bson:"updatedAt,omitempty"`
		DeletedAt time.Time           `json:"deletedAt" bson:"deletedAt,omitempty"`
	}
)
