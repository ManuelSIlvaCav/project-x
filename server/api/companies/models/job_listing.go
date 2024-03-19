package companies_models

type (
	JobListing struct {
		ID                 string              `json:"id" bson:"_id,omitempty"`
		CompanyID          string              `json:"company_id" bson:"companyId"`
		BaseJobListing     *BaseJobListing     `json:"base_job_listing" bson:"baseJobListing"`
		WorkDetails        *WorkDetails        `json:"work_details" bson:"workDetails"`
		RoleDetails        *RoleDetails        `json:"role_details" bson:"roleDetails"`
		JobListingBenefits *JobListingBenefits `json:"job_listing_benefits" bson:"jobListingBenefits"`
		AdditionalDetails  *AdditionalDetails  `json:"additional_details" bson:"additionalDetails"`
	}

	BaseJobListing struct {
		RoleName           string `json:"role_name" bson:"roleName"`
		MinExperienceLevel string `json:"min_experience_level" bson:"minExperienceLevel"`
		MaxExperienceLevel string `json:"max_experience_level" bson:"maxExperienceLevel"`
	}

	WorkDetails struct {
		WorkModality  string   `json:"work_modality" bson:"workModality"`   // Remote, Onsite, Hybrid
		CitiesAllowed []string `json:"cities_allowed" bson:"citiesAllowed"` //Should be a list of cities TODO - Create address type
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
