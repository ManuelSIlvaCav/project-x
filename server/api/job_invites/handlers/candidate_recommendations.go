package handlers

import (
	"context"
	"net/http"
	job_invites_models "server/api/job_invites/models"
	"server/api/job_invites/repository"
	"server/container"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func CandidateRecommendations(
	container *container.Container,
	candidateRecommendationRepository repository.CandidateRecommendationRepository) echo.HandlerFunc {
	return func(c echo.Context) error {

		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		//We read company id from url and query params limit and cursor
		companyID := c.QueryParam("company_id")
		jobID := c.QueryParam("job_id")

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

		var filter = &job_invites_models.CandidateRecommendationFilter{
			CompanyID: companyID,
			JobID:     jobID,
		}

		recommendations, err := candidateRecommendationRepository.GetCandidateRecommendations(filter, cursor, limit)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		logger := container.GetLogger()
		logger.Info("Recommendations", recommendations)

		nextCursor := ""
		if len(recommendations) > 0 {
			nextCursor = recommendations[len(recommendations)-1].ID
		} else {
			recommendations = []job_invites_models.CandidateRecommendation{}
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"candidates": recommendations,
			"next_cursor": nextCursor}})
	}
}
