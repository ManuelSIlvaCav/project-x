package emails_handlers

import (
	"context"
	"net/http"
	emails_model "server/api/emails/models"
	email_repository "server/api/emails/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

type (
	CreateEmailTemplateInput struct {
		ID            string      `json:"id,omitempty"`
		Name          string      `json:"name" validate:"required" errormgs:"is required"`
		Subject       string      `json:"subject" validate:"required" errormgs:"is required"`
		DesignContent interface{} `json:"design_content" validate:"required"  errormgs:"is required"`
		HtmlContent   string      `json:"html_content" validate:"required"  errormgs:"is required"`
	}
)

func CreateEmailTemplate(container *container.Container, emailTemplateRepository email_repository.EmailTemplateRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var createEmailTemplateInput CreateEmailTemplateInput

		if err := c.Bind(&createEmailTemplateInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()

		if validationErrs := validator.ValidateStruct(createEmailTemplateInput); len(validationErrs) > 0 {
			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		logger.Info("CreateEmailTemplateInput", "createEmailTemplateInput", createEmailTemplateInput)

		emailTemplate := emails_model.EmailTemplate{
			Name:          createEmailTemplateInput.Name,
			Subject:       createEmailTemplateInput.Subject,
			DesignContent: createEmailTemplateInput.DesignContent,
			HtmlContent:   createEmailTemplateInput.HtmlContent,
			CreatedAt:     time.Now(),
		}

		result, err := emailTemplateRepository.SaveEmailTemplate(emailTemplate)
		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		return c.JSON(http.StatusOK, &echo.Map{"message": "success", "data": result})
	}
}
