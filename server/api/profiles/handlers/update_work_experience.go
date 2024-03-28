package profiles_handlers

import (
	"context"
	"net/http"
	profiles_models "server/api/profiles/models"
	profiles_repository "server/api/profiles/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

type (
	WorkExperienceOverviewInput struct {
		Company        string `json:"company" validate:"required,min=2,max=100" errormgs:"Company is required and must be between 2 and 100 characters long"`
		Role           string `json:"role" validate:"required,min=2,max=100" errormgs:"Role is required and must be between 2 and 100 characters long"`
		StartDateMonth int    `json:"start_date_month" validate:"required,gte=1,lte=12"`
		StartDateYear  int    `json:"start_date_year" validate:"required,gte=1900,lte=2100"` //SORRY, I HAD TO ADD THIS
		EndDateMonth   int    `json:"end_date_month" validate:"required,gte=1,lte=12"`
		EndDateYear    int    `json:"end_date_year" validate:"required,gte=1900,lte=2100,gtefield=StartDateYear"`
	}

	WorkExperienceRoleOverviewInput struct {
		Descriptions []string `json:"descriptions" validate:"required"`
	}

	WorkExperienceCompanyOverviewInput struct {
		CompanyDescription string `json:"company_description" validate:"required"`
		CompanyWebsite     string `json:"company_website" validate:"required"`
	}

	WorkExperienceInput struct {
		ProfileId string `param:"profile_id" validate:"required"`
		//ID allows to update a specific work experience for that user
		ID              string                              `json:"id,omitempty"`
		WorkExperience  *WorkExperienceOverviewInput        `json:"work_experience_overview,omitempty"`
		RoleOverview    *WorkExperienceRoleOverviewInput    `json:"role_overview,omitempty"`
		CompanyOverview *WorkExperienceCompanyOverviewInput `json:"company_overview,omitempty"`
	}
)

func UpdateWorkExperience(container *container.Container, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var workExperienceData WorkExperienceInput

		if err := c.Bind(&workExperienceData); err != nil {
			logger.Error("Failed to bind the data", "error", err.Error())
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Input data is invalid"})
		}

		validator := container.GetCustomValidator()

		//use the validator library to validate required fields
		if validationErrs := validator.ValidateStruct(workExperienceData); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		newWorkExperience := profiles_models.WorkExperience{}

		if workExperienceData.WorkExperience != nil {
			newWorkExperience.Company = workExperienceData.WorkExperience.Company
			newWorkExperience.Role = workExperienceData.WorkExperience.Role
			newWorkExperience.StartDateMonth = workExperienceData.WorkExperience.StartDateMonth
			newWorkExperience.StartDateYear = workExperienceData.WorkExperience.StartDateYear
			newWorkExperience.EndDateYear = workExperienceData.WorkExperience.EndDateYear
			newWorkExperience.EndDateMonth = workExperienceData.WorkExperience.EndDateMonth
		}

		if workExperienceData.RoleOverview != nil && len(workExperienceData.RoleOverview.Descriptions) > 0 {
			for _, description := range workExperienceData.RoleOverview.Descriptions {
				newWorkExperience.Descriptions = append(newWorkExperience.Descriptions, &profiles_models.Description{Value: description})
			}
		}

		logger.Info("Saving work experience", "data", newWorkExperience)

		result, err := userProfileRepository.UpdateUserProfileWorkExperience(workExperienceData.ProfileId, workExperienceData.ID, newWorkExperience)

		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}
		logger.Info("Work experience saved", "result", result)

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": result})
	}
}
