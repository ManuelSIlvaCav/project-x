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
		Email    string `json:"email" validate:"required,email" errormgs:"is required and must be a valid email address"`
		Password string `json:"password" validate:"required"`
	}
)

func Login(container *container.Container, userModule *users.UserModule) echo.HandlerFunc {
	return func(c echo.Context) error {
		validator := container.GetCustomValidator()

		var user UserLogin

		if err := c.Bind(&user); err != nil {

			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		structToValidate := &user
		if validationErrs := validator.ValidateStruct(*structToValidate); validationErrs != nil {

			if uw, ok := validationErrs.(interface{ Unwrap() []error }); ok {
				errs := uw.Unwrap()
				//Return all errors to the client
				arr := []string{}
				for _, err := range errs {
					arr = append(arr, err.Error())
				}
				return c.JSON(http.StatusBadRequest, &echo.Map{"errors": arr})
			}

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs.Error()})
		}

		userRepository := userModule.UserRepository

		userFound, err := userRepository.LoginUser(user.Email, user.Password)

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
