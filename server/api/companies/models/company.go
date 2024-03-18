package companies_models

import "time"

type (
	Company struct {
		ID             string    `json:"id" bson:"_id,omitempty"`
		CompanyName    string    `json:"companyName" bson:"companyName"`
		CompanyWebsite string    `json:"companyWebsite" bson:"companyWebsite"`
		AdminEmail     string    `json:"adminEmail" bson:"adminEmail"`
		Country        string    `json:"country" bson:"country"`
		CreatedAt      time.Time `json:"createdAt" bson:"createdAt,omitempty"`
		UpdatedAt      time.Time `json:"updatedAt" bson:"updatedAt,omitempty"`
		DeletedAt      time.Time `json:"deletedAt" bson:"deletedAt,omitempty"`
	}
)
