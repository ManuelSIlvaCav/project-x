package profiles_models

type (
	CompanyProfile struct {
		ID          string `json:"id" bson:"_id"`
		CompanyName string `json:"companyName" bson:"companyName"`
		//Company description
		CompanyDescription string `json:"companyDescription" bson:"companyDescription"`
		//Company links
		CompanyLinks []CompanyLink `json:"companyLinks" bson:"companyLinks"`
	}
	CompanyLink struct {
		DestinationName string `json:"destinationName" bson:"destinationName"`
		Link            string `json:"link" bson:"link"`
	}
)
