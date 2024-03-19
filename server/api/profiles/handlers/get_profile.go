package profiles_handlers

import (
	"context"
	"net/http"
	profiles_repository "server/api/profiles/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

func GetProfile(container *container.Container, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		userID := c.Param("profile_id")

		userProfile, err := userProfileRepository.GetUserProfile(userID)

		if err != nil {
			logger.Error("Error getting user profile", "error", err)
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": "Error getting user profile"})
		}

		logger.Info("User profile", "user_profile", userProfile, "err", err)

		if userProfile == nil {
			return c.JSON(http.StatusNotFound, &echo.Map{"message": "User profile not found"})
		}

		return c.JSON(http.StatusOK, echo.Map{
			"data": userProfile,
		})
	}
}
