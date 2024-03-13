package company_models

type (
	Company struct {
		ID             string `json:"id" bson:"_id"`
		CompanyName    string `json:"companyName" bson:"companyName"`
		CompanyWebsite string `json:"companyWebsite" bson:"companyWebsite"`
		AdminEmail     string `json:"adminEmail" bson:"adminEmail"`
		Password       string `json:"password" validate:"required,min=6,max=20" errormgs:"Password is required and must be between 6 and 20 characters" bson:"password"`
		Country        string `json:"country" bson:"country"`
	}
)
