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
	EducationInput struct {
		ID            string `json:"id,omitempty"`
		ProfileId     string `param:"profile_id" validate:"required"`
		StartDateYear string `json:"start_date_year" validate:"required"`
		EndDateYear   string `json:"end_date_year" validate:"required"`
		SchoolName    string `json:"school_name" validate:"required" errormgs:"School name is required"`
		Description   string `json:"description" validate:"required" errormgs:"Description is required"`
	}
)

// UpdateWorkExperience updates the work experiences of a user, depending on the userId. It can update information on 3 inputs work_experience_overview, role_overview, company_overview for a customized wizard
func UpdateEducation(container *container.Container, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var educationData EducationInput

		if err := c.Bind(&educationData); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(educationData); len(validationErrs) > 0 {
			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		newWorkExperience := profiles_models.Education{
			StartDateYear: educationData.StartDateYear,
			EndDateYear:   educationData.EndDateYear,
			SchoolName:    educationData.SchoolName,
			Description:   educationData.Description,
		}

		logger.Info("Saving education experience", "data", newWorkExperience)

		result, err := userProfileRepository.UpdateUserProfileEducation(educationData.ProfileId, educationData.ID, newWorkExperience)

		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		logger.Info("Education saved", "result", result)

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": result})
	}
}
