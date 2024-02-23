package profiles_models

import "go.mongodb.org/mongo-driver/bson/primitive"

type (
	UserProfile struct {
		Id     primitive.ObjectID `json:"id,omitempty"`
		UserID primitive.ObjectID `bson:"user_id" json:"user_id"`

		UploadCVFileID primitive.ObjectID `json:"uploadCVFileID" bson:"uploadCVFileID"`

		//Contact information
		ContactInformation ContactInformation `json:"contactInformation" bson:"contactInformation"`

		//Work experience
		WorkExperience []WorkExperience `json:"workExperience" bson:"workExperience"`

		//Education
		Education []Education `json:"education" bson:"education"`

		//Links
		Links Links `json:"links" bson:"links"`
	}

	ContactInformation struct {
		Email    string `json:"email" bson:"email"`
		Phone    string `json:"phone" bson:"phone"`
		Address  string `json:"address" bson:"address"`
		Location string `json:"location" bson:"location"`
	}

	WorkExperience struct {
		Company     string `json:"company" bson:"company"`
		Position    string `json:"position" bson:"position"`
		StartDate   string `json:"startDate" bson:"startDate"`
		EndDate     string `json:"endDate" bson:"endDate"`
		Description string `json:"description" bson:"description"`
	}

	Education struct {
		SchoolName  string `json:"schoolName" bson:"schoolName"`
		StartDate   string `json:"startDate" bson:"startDate"`
		EndDate     string `json:"endDate" bson:"endDate"`
		Description string `json:"description" bson:"description"`
	}

	Links struct {
		Linkedin  string `json:"linkedin" bson:"linkedin"`
		Github    string `json:"github" bson:"github"`
		Portfolio string `json:"portfolio" bson:"portfolio"`
		Other     string `json:"other" bson:"other"`
	}
)
