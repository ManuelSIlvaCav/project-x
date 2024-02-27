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
		RoleDescription string `json:"role_description" validate:"required"`
	}

	WorkExperienceCompanyOverviewInput struct {
		CompanyDescription string `json:"company_description" validate:"required"`
		CompanyWebsite     string `json:"company_website" validate:"required"`
	}

	WorkExperienceInput struct {
		UserId          string                              `param:"user_id" validate:"required"`
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

		logger.Info("Starting update work experience")

		if err := c.Bind(&workExperienceData); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		logger.Info("Validating work experience", "data", workExperienceData)
		validate := container.GetValidator()

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&workExperienceData); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		//Now we save it into the repository
		newWorkExperience := profiles_models.WorkExperience{
			Company:        workExperienceData.WorkExperience.Company,
			Role:           workExperienceData.WorkExperience.Role,
			StartDateMonth: workExperienceData.WorkExperience.StartDateMonth,
			StartDateYear:  workExperienceData.WorkExperience.StartDateYear,
			EndDateYear:    workExperienceData.WorkExperience.EndDateYear,
			EndDateMonth:   workExperienceData.WorkExperience.EndDateMonth,
		}

		logger.Info("Saving work experience", "data", workExperienceData)

		result, err := userProfileRepository.UpdateUserProfileWorkExperience(workExperienceData.UserId, newWorkExperience)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}
		logger.Info("Work experience saved", "result", result)

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": &echo.Map{"id": result}})
	}
}
