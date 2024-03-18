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

type UserInput struct {
	FirstName string `json:"first_name" validate:"required,min=3,max=20" errormgs:"First name is required and must be between 3 and 20 characters"`
	LastName  string `json:"last_name" validate:"required,min=3,max=20" errormgs:"Last name is required and must be between 3 and 20 characters"`
	Email     string `json:"email" validate:"required,email" errormgs:"Email is required and must be a valid email address"`
	Password  string `json:"password" validate:"required,min=6,max=20" errormgs:"Password is required and must be between 6 and 20 characters" bson:"password"`
}

func Register(container *container.Container, userRepository repository.UserRepository, profilesModule *profiles.ProfilesModule) echo.HandlerFunc {
	return func(c echo.Context) error {
		logger := container.GetLogger()
		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		var user UserInput
		defer cancel()

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validate := container.GetCustomValidator().GetValidator()
		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		newUser := user_models.User{
			FirstName:   user.FirstName,
			LastName:    user.LastName,
			Email:       user.Email,
			Password:    user.Password,
			GeneralRole: "candidate",
			CreatedAt:   time.Now(),
		}
		logger.Info("Creating user", "user", newUser)

		userId, err := userRepository.CreateUser(newUser)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		logger.Info("User created ", "userId", userId)

		createUserProfileErr := createUserProfile(container, profilesModule, userId)

		if createUserProfileErr != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": createUserProfileErr.Error()})
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": userId}})
	}
}

func createUserProfile(container *container.Container, profilesModule *profiles.ProfilesModule, userId string) error {

	logger := container.GetLogger()

	objectId, err := primitive.ObjectIDFromHex(userId)

	if err != nil {
		return err
	}

	newProfile := profiles_models.UserProfile{UserID: &objectId, WorkExperiences: []*profiles_models.WorkExperience{}}

	logger.Info("Creating profile", "profile", newProfile)

	profileId, GetProfileErr := profilesModule.GetUserProfilesRepository().CreateUserProfile(newProfile)

	if GetProfileErr != nil {
		return GetProfileErr
	}

	logger.Info("Profile created successfully", "profileId", profileId)

	return nil
}
