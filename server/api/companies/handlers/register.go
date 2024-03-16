package companies

import (
	"context"
	"net/http"
	companies_models "server/api/companies/models"
	company_repository "server/api/companies/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

func Register(container *container.Container, companyRepository company_repository.CompanyRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		logger := container.GetLogger()
		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		var company companies_models.Company
		defer cancel()

		if err := c.Bind(&company); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validate := container.GetCustomValidator().GetValidator()
		//use the validator library to validate required fields
		if validationErr := validate.Struct(&company); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		newCompany := companies_models.Company{
			CompanyName:    company.CompanyName,
			Country:        company.Country,
			AdminEmail:     company.AdminEmail,
			CompanyWebsite: company.CompanyWebsite,
			Password:       company.Password,
		}

		logger.Info("Creating company", "company", newCompany)

		companyId, err := companyRepository.CreateCompany(newCompany)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		logger.Info("Company created ", "companyId", companyId)

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": companyId}})
	}
}
