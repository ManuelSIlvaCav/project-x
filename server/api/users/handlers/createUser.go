package users

import (
	"context"
	"fmt"
	"net/http"
	responses "server/api/models"
	user_models "server/api/users/models"
	"server/api/users/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(container container.Container, userRepository repository.UserRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		fmt.Printf("Hello from api echo handler")

		var user user_models.User
		defer cancel()

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
		}

		newUser := user_models.User{
			Id:       primitive.NewObjectID(),
			Name:     user.Name,
			Email:    user.Email,
			Password: user.Password,
		}

		result, err := userRepository.CreateUser(ctx, newUser)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
		}

		return c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": result}})
	}
}
