package auth

import (
	"net/http"
	"server/api/users"
	"server/container"

	jwtUtils "server/api/auth/jwt"

	"github.com/labstack/echo/v4"
)

type (
	UserLogin struct {
		Email       string `json:"email" validate:"required,email" errormgs:"email is required and must be a valid email address"`
		Password    string `json:"password" validate:"required"`
		GeneralRole string `json:"general_role" validate:"required"`
	}
)

func Login(container *container.Container, userModule *users.UserModule) echo.HandlerFunc {
	return func(c echo.Context) error {

		var user UserLogin

		if err := c.Bind(&user); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(user); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		userRepository := userModule.UserRepository

		userFound, err := userRepository.LoginUser(user.Email,
			user.Password,
			map[string]interface{}{"generalRole": user.GeneralRole})

		if err != nil || userFound == nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Invalid email or password2"})
		}

		// Create token
		token, err := jwtUtils.CreateJwtToken(userFound.FirstName, userFound.LastName)

		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"error": "could not create token",
			})
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token":        token,
			"user_id":      userFound.ID,
			"general_role": userFound.GeneralRole,
		})
	}
}
