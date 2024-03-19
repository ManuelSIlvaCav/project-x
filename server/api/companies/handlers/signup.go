package companies_handlers

import (
	"context"
	"net/http"
	companies_models "server/api/companies/models"
	companies_services "server/api/companies/services"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

func Signup(
	container *container.Container,
	companyService companies_services.CompanyService,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		var companyInput companies_models.CompanySignupInput

		if err := c.Bind(&companyInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()
		structToValidate := &companyInput

		if validationErrs := validator.ValidateStruct(*structToValidate); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		companyId, err := companyService.CreateCompany(companyInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": companyId}})
	}
}
