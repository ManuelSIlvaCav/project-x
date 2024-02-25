package profiles_handlers

import (
	"context"
	"net/http"
	files_module "server/api/files"
	"server/container"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type (
	CVData struct {
		UserId string `json:"user_id" form:"user_id" validate:"required"`
	}
)

var validate = validator.New()

func UploadCV(container *container.Container, fileModule *files_module.FilesModule) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		var cvData CVData

		logger.Info("Starting", "cv", "Data")

		if err := c.Bind(&cvData); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&cvData); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		file, err := c.FormFile("cv")

		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		src, err := file.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		defer src.Close()

		//We want to upload the CV to s3 files and save the File Object reference in the user profile
		result, err := fileModule.FileService.UploadFile(file.Filename, src)

		time.Sleep(4 * time.Second)

		if err != nil {
			logger.Error("Failed to upload CV", "error", err)
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": "failed to upload CV"})
		}

		logger.Info("CV uploaded successfully", "result", result)

		//We will upsert the user profile with the new file object reference

		return c.JSON(http.StatusOK, &echo.Map{"message": "success"})
	}
}
