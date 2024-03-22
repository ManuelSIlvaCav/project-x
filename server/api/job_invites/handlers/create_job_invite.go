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

func CreateJobInvite(
	container *container.Container,
	jobInviteRepository repository.JobInvitesRepository,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		var jobInviteInput job_invites_models.JobInviteInput

		if err := c.Bind(&jobInviteInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(jobInviteInput); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		jobInvite, err := jobInviteRepository.CreateJobInvite(jobInviteInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})

		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": jobInvite}})
	}
}
