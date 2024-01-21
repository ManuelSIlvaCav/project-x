package users

import (
	"fmt"
	"server/container"

	"github.com/labstack/echo/v4"
)

func Users(container container.Container) echo.HandlerFunc {
	return func(c echo.Context) error {
		fmt.Printf("Hello from api echo handler")
		return c.JSON(200, "Hello from users")
	}
}
