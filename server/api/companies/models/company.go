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

	CompanySignupInput struct {
		CompanyName    string `json:"company_name" validate:"required"`
		CompanyWebsite string `json:"company_website" validate:"required"`
		AdminEmail     string `json:"admin_email" validate:"required,email"`
		Password       string `json:"password" validate:"required,min=6,max=20" errormgs:"Password is required and must be between 6 and 20 characters"`
	}
)
