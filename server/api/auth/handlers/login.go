package auth

import (
	"net/http"
	"server/api/users"
	"server/container"

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

func Login(container *container.Container, userModule *users.UserModule) echo.HandlerFunc {
	return func(c echo.Context) error {

		logger := container.GetLogger()

		var user UserLogin

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		userRepository := userModule.UserRepository

		userFound, err := userRepository.LoginUser(user.Email, user.Password)

		logger.Info("User data ", "user", userFound)

		if err != nil || userFound == nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Invalid email or password"})
		}

		// Create token
		token, err := jwtUtils.CreateJwtToken(userFound.FirstName, userFound.LastName)

		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "could not create token",
			})
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token":  token,
			"userId": userFound.ID,
		})
	}
}
