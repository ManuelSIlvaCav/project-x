package profiles_models

import (
	files_model "server/api/files/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	UserProfile struct {
		ID     string              `json:"id" bson:"_id,omitempty"`
		UserID *primitive.ObjectID `bson:"userId" json:"user_id"`

		CvFileId *primitive.ObjectID `json:"cv_file_id,omitempty" bson:"cvFileId,omitempty"`

		CV *files_model.File `json:"cv,omitempty" bson:"cv,omitempty"` // CV file should be used as ref when using lookup in mongo

		FullName string `json:"full_name" bson:"fullName"`

		Email string `json:"email" bson:"email" validate:"required,email" errormgs:"Email is required and must be a valid email address"`

		Phone string `json:"phone" bson:"phone,omitempty"`

		//Contact information
		ContactInformation *ContactInformation `json:"contact_information,omitempty" bson:"contactInformation,omitempty"`

		//Work experience
		WorkExperiences []*WorkExperience `json:"work_experiences,omitempty" bson:"workExperiences"`

		//Education
		Education []*Education `json:"education,omitempty" bson:"education,omitempty"`

		//Additional information
		AdditionalInformation *AdditionalInformation `json:"additional_information,omitempty" bson:"additionalInformation,omitempty"`

		//Links
		Links *Links `json:"links,omitempty" bson:"links,omitempty"`
	}

	ContactInformation struct {
		Phone    string `json:"phone" bson:"phone"`
		Address  string `json:"address" bson:"address"`
		Location string `json:"location" bson:"location"`
	}

	AdditionalInformation struct {
		RequiresVisaIn []string `json:"requires_visa_in" bson:"requiresVisaIn"`
		NoticePeriod   int      `json:"notice_period" bson:"noticePeriod"`
		Languages      []string `json:"languages" bson:"languages"`
	}

	WorkExperience struct {
		ID                 primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Company            string             `json:"company" bson:"company"`
		Role               string             `json:"role" bson:"role"`
		StartDateMonth     int                `json:"start_date_month" bson:"startDateMonth"`
		StartDateYear      int                `json:"start_date_year" bson:"startDateYear"`
		EndDateYear        int                `json:"end_date_year" bson:"endDateYear"`
		EndDateMonth       int                `json:"end_date_month" bson:"endDateMonth"`
		CompanyDescription string             `json:"company_description,omitempty" bson:"companyDescription,omitempty"`
		CompanyWebsite     string             `json:"company_website,omitempty" bson:"companyWebsite,omitempty"`
		Descriptions       []*Description     `json:"descriptions,omitempty" bson:"descriptions,omitempty"`
	}

	Education struct {
		ID            primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		SchoolName    string             `json:"school_name" bson:"schoolName"`
		StartDateYear string             `json:"start_date_year" bson:"startDateYear"`
		EndDateYear   string             `json:"end_date_year" bson:"endDateYear"`
		Description   string             `json:"description" bson:"description"`
	}

	Links struct {
		Linkedin  string `json:"linkedin" bson:"linkedin"`
		Github    string `json:"github" bson:"github"`
		Portfolio string `json:"portfolio" bson:"portfolio"`
		Other     string `json:"other" bson:"other"`
	}

	Description struct {
		ID    *primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
		Value string              `json:"value" bson:"value"`
	}
)
