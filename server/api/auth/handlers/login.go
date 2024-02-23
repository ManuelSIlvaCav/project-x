package auth

import (
	"context"
	"fmt"
	"net/http"
	"server/api/users"

	jwtUtils "server/api/auth/jwt"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type (
	UserLogin struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}
)

var validate = validator.New()

func Login(userModule *users.UserModule) echo.HandlerFunc {
	return func(c echo.Context) error {

		var user UserLogin

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}
		fmt.Println("Login")
		userRepository := userModule.UserRepository

		userFound, err := userRepository.GetUser(context.TODO(), user.Email, user.Password)

		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Invalid email or password"})
		}

		fmt.Println("User", userFound)

		// Create token
		token, err := jwtUtils.GetJWTToken(userFound.FirstName, userFound.LastName)

		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "could not create token",
			})
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token": token,
		})
	}
}
