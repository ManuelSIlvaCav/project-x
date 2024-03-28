package companies_models

import "go.mongodb.org/mongo-driver/bson/primitive"

type (
	JobListing struct {
		ID                 string              `json:"id" bson:"_id,omitempty"`
		CompanyID          *primitive.ObjectID `json:"company_id" bson:"companyId"`
		BaseDetails        *BaseDetails        `json:"base_details" bson:"baseDetails" validate:"required"`
		WorkDetails        *WorkDetails        `json:"work_details" bson:"workDetails" validate:"required"`
		RoleDetails        *RoleDetails        `json:"role_details" bson:"roleDetails" validate:"required"`
		JobListingBenefits *JobListingBenefits `json:"job_listing_benefits" bson:"jobListingBenefits" validate:"required"`
		AdditionalDetails  *AdditionalDetails  `json:"additional_details" bson:"additionalDetails" `
	}

	BaseDetails struct {
		RoleName           string `json:"role_name" bson:"roleName" validate:"required"`
		CompanyFunction    string `json:"company_function" bson:"companyFunction" validate:"required"` //Sales, Marketing, Finance, Engineering, etc
		MinExperienceLevel int    `json:"min_experience_level" bson:"minExperienceLevel" validate:"required,gte=0,lte=7"`
		MaxExperienceLevel int    `json:"max_experience_level" bson:"maxExperienceLevel" validate:"required,gte=0,lte=7,gtefield=MinExperienceLevel"`
	}
	WorkDetails struct {
		WorkType string `json:"work_type" bson:"workType" validate:"required,oneof=REMOTE HYBRID ONSITE" errormgs:"Work type should be remote, onsite or hybrid"` // Remote, Onsite, Hybrid
		//Todo include the location for the job if the work type is onsite / hybdrid
	}
	RoleDetails struct {
		RoleDescription      []string `json:"role_description" bson:"roleDescription"`
		RoleResponsibilities []string `json:"role_responsibilities" bson:"roleResponsibilities"`
		RoleRequirements     []string `json:"role_requirements" bson:"roleRequirements"`
		RoleIdioms           []string `json:"role_idioms" bson:"roleIdioms"`
	}

	JobListingBenefits struct {
		BenefitDescriptions    []string `json:"benefit_descriptions" bson:"benefitDescriptions"`
		ConditionsDescriptions []string `json:"conditions_descriptions" bson:"conditionsDescriptions"`
		MinSalary              int      `json:"min_salary" bson:"minSalary"`
		MaxSalary              int      `json:"max_salary" bson:"maxSalary"`
		SalaryHidden           bool     `json:"salary_hidden" bson:"salaryHidden"`
		VisaSponsorship        bool     `json:"visa_sponsorship" bson:"visaSponsorship"`
	}
	AdditionalDetails struct {
		SnacksAndDrinks   bool `json:"snacks_and_drinks" bson:"snacksAndDrinks"`
		HealthInsurance   bool `json:"health_insurance" bson:"healthInsurance"`
		FlexibleHours     bool `json:"flexible_hours" bson:"flexibleHours"`
		RelocationHelp    bool `json:"relocation_help" bson:"relocationHelp"`
		PetFriendly       bool `json:"pet_friendly" bson:"petFriendly"`
		CasualDressCode   bool `json:"casual_dress_code" bson:"casualDressCode"`
		ExtraVacationDays int  `json:"extra_vacation_days" bson:"extraVacationDays"`
	}
)
