package users

import (
	"context"
	"net/http"
	user_models "server/api/users/models"
	"server/api/users/repository"
	"server/container"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var validate = validator.New()

func Register(container *container.Container, userRepository repository.UserRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		var user user_models.User
		defer cancel()

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		newUser := user_models.User{
			Id:        primitive.NewObjectID(),
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			Password:  user.Password,
			CreatedAt: time.Now(),
		}

		result, err := userRepository.CreateUser(ctx, newUser)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": result}})
	}
}
