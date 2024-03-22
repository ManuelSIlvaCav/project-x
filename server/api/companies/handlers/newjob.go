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

func NewJob(
	container *container.Container,
	companyService companies_services.CompanyService) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		var jobInput companies_models.JobListing

		if err := c.Bind(&jobInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(jobInput); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		companyId := c.Param("company_id")

		jobListingId, err := companyService.CreateJobListing(companyId, jobInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})

		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": jobListingId}})
	}
}
