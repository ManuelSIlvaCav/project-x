package handlers

import (
	"context"
	"net/http"
	job_invites_models "server/api/job_invites/models"
	"server/api/job_invites/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

func RecommendCandidate(
	container *container.Container,
	candidateRecommendationRepository repository.CandidateRecommendationRepository,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		var recommendCandidateInput job_invites_models.CandidateRecommendationInput

		if err := c.Bind(&recommendCandidateInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(recommendCandidateInput); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		jobInvite, err := candidateRecommendationRepository.CreateCandidateRecommendation(recommendCandidateInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})

		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": jobInvite}})
	}
}
