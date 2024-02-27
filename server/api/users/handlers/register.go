package users

import (
	"context"
	"net/http"
	"server/api/profiles"
	profiles_models "server/api/profiles/models"
	user_models "server/api/users/models"
	"server/api/users/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Register(container *container.Container, userRepository repository.UserRepository, profilesModule *profiles.ProfilesModule) echo.HandlerFunc {
	return func(c echo.Context) error {
		logger := container.GetLogger()
		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		var user user_models.User
		defer cancel()

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validate := container.GetValidator()
		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		newUser := user_models.User{
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			Password:  user.Password,
			CreatedAt: time.Now(),
		}

		result, err := userRepository.CreateUser(newUser)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		logger.Info("Getting user Info", "id", result)

		getUser, err := userRepository.GetUserByID(result)

		logger.Info("UserInfo", "user", getUser)

		userId, err := primitive.ObjectIDFromHex(getUser.ID)
		newProfile := profiles_models.UserProfile{UserID: userId, WorkExperiences: []*profiles_models.WorkExperience{}}

		logger.Info("Creating profile", "profile", newProfile)

		profileId, err := profilesModule.GetUserProfilesRepository().CreateUserProfile(newProfile)

		logger.Info("Profile created successfully", "profileId", profileId)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": result}})
	}
}
