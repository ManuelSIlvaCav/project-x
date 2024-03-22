package companies_handlers

import (
	"context"
	"net/http"
	companies_services "server/api/companies/services"
	"server/container"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func Jobs(
	container *container.Container,
	companyService companies_services.CompanyService) echo.HandlerFunc {
	return func(c echo.Context) error {

		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		//We read company id from url and query params limit and cursor
		companyID := c.Param("company_id")
		queryLimit := c.QueryParam("limit")
		cursor := c.QueryParam("cursor")

		limit := 10

		if queryLimit != "" {
			convertedLimit, conversionError := strconv.Atoi(queryLimit)
			if conversionError != nil {
				return c.JSON(http.StatusBadRequest, &echo.Map{"message": "Invalid limit"})
			}
			limit = convertedLimit
		}

		jobListings, err := companyService.GetJobListings(companyID, cursor, limit)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		nextCursor := ""
		if len(jobListings) > 0 {
			nextCursor = jobListings[len(jobListings)-1].ID
		}

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": &echo.Map{"job_listings": jobListings,
			"next_cursor": nextCursor}})
	}
}
