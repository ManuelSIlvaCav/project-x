package profiles_handlers

import (
	"context"
	"net/http"
	profiles_repository "server/api/profiles/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

type (
	DeleteWorkExperienceInput struct {
		ProfileId        string `param:"profile_id" validate:"required"`
		WorkExperienceId string `param:"work_experience_id" validate:"required"`
	}
)

func DeleteWorkExperience(container *container.Container, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var deleteParams DeleteWorkExperienceInput

		if err := c.Bind(&deleteParams); err != nil {
			logger.Error("Failed to bind the data", "error", err.Error())
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Input data is invalid"})
		}

		deleted, err := userProfileRepository.DeleteUserProfileWorkExperience(deleteParams.ProfileId, deleteParams.WorkExperienceId)

		if err != nil {
			logger.Error("Failed to delete work experience", "error", err.Error())
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": "Failed to delete work experience"})
		}

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": deleted})

	}
}
