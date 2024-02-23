package users

import (
	"fmt"
	"net/http"
	"server/api/users/repository"
	"server/container"

	"github.com/labstack/echo/v4"
)

func Users(container *container.Container, userRepository repository.UserRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		fmt.Printf("Hello from api echo handler")

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"data": "Hello from api echo handler"}})
	}
}
