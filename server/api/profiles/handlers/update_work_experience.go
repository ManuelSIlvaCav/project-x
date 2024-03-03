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
		Company        string `json:"company" validate:"required"`
		Role           string `json:"role" validate:"required"`
		StartDateMonth string `json:"start_date_month" validate:"required"`
		StartDateYear  string `json:"start_date_year" validate:"required"`
		EndDateMonth   string `json:"end_date_month" validate:"required"`
		EndDateYear    string `json:"end_date_year" validate:"required"`
	}

	WorkExperienceRoleOverviewInput struct {
		Descriptions []string `json:"descriptions" validate:"required"`
	}

	WorkExperienceCompanyOverviewInput struct {
		CompanyDescription string `json:"company_description" validate:"required"`
		CompanyWebsite     string `json:"company_website" validate:"required"`
	}

	WorkExperienceInput struct {
		UserId string `param:"user_id" validate:"required"`
		//ID allows to update a specific work experience for that user
		ID              string                              `json:"id,omitempty"`
		WorkExperience  *WorkExperienceOverviewInput        `json:"work_experience_overview,omitempty"`
		RoleOverview    *WorkExperienceRoleOverviewInput    `json:"role_overview,omitempty"`
		CompanyOverview *WorkExperienceCompanyOverviewInput `json:"company_overview,omitempty"`
	}
)

// UpdateWorkExperience updates the work experiences of a user, depending on the userId. It can update information on 3 inputs work_experience_overview, role_overview, company_overview for a customized wizard
func UpdateWorkExperience(container *container.Container, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var workExperienceData WorkExperienceInput

		if err := c.Bind(&workExperienceData); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validate := container.GetValidator()

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&workExperienceData); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		logger.Info("Updating work experience", "data", workExperienceData)

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

		result, err := userProfileRepository.UpdateUserProfileWorkExperience(workExperienceData.UserId, workExperienceData.ID, newWorkExperience)

		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}
		logger.Info("Work experience saved", "result", result)

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": result})
	}
}
