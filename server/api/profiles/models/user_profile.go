package profiles_models

import (
	files_model "server/api/files/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	UserProfile struct {
		ID     string              `json:"id" bson:"_id,omitempty"`
		UserID *primitive.ObjectID `bson:"userId" json:"userId"`

		CvFileId *primitive.ObjectID `json:"cvFileId,omitempty" bson:"cvFileId,omitempty"`

		CV *files_model.File `json:"cv,omitempty" bson:"cv,omitempty"` // CV file should be used as ref when using lookup in mongo

		//Contact information
		ContactInformation *ContactInformation `json:"contactInformation,omitempty" bson:"contactInformation,omitempty"`

		//Work experience
		WorkExperiences []*WorkExperience `json:"workExperiences,omitempty" bson:"workExperiences"`

		//Education
		Education []*Education `json:"education,omitempty" bson:"education,omitempty"`

		//Links
		Links *Links `json:"links,omitempty" bson:"links,omitempty"`
	}

	ContactInformation struct {
		Email    string `json:"email" bson:"email"`
		Phone    string `json:"phone" bson:"phone"`
		Address  string `json:"address" bson:"address"`
		Location string `json:"location" bson:"location"`
	}

	WorkExperience struct {
		ID                 primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Company            string             `json:"company" bson:"company"`
		Role               string             `json:"role" bson:"role"`
		StartDateMonth     string             `json:"startDateMonth" bson:"startDateMonth"`
		StartDateYear      string             `json:"startDateYear" bson:"startDateYear"`
		EndDateYear        string             `json:"endDateYear" bson:"endDateYear"`
		EndDateMonth       string             `json:"endDateMonth" bson:"endDateMonth"`
		CompanyDescription string             `json:"companyDescription,omitempty" bson:"companyDescription,omitempty"`
		CompanyWebsite     string             `json:"companyWebsite,omitempty" bson:"companyWebsite,omitempty"`
		Descriptions       []*Description     `json:"descriptions,omitempty" bson:"descriptions,omitempty"`
	}

	Description struct {
		ID    *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Value string              `json:"value" bson:"value"`
	}

	Education struct {
		ID            primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		SchoolName    string             `json:"schoolName" bson:"schoolName"`
		StartDateYear string             `json:"startDate" bson:"startDate"`
		EndDateYear   string             `json:"endDate" bson:"endDate"`
		Description   string             `json:"description" bson:"description"`
	}

	Links struct {
		Linkedin  string `json:"linkedin" bson:"linkedin"`
		Github    string `json:"github" bson:"github"`
		Portfolio string `json:"portfolio" bson:"portfolio"`
		Other     string `json:"other" bson:"other"`
	}
)
