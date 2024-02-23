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
		UploadFile string `json:"upload_file" validate:"required"`
		UserId     string `json:"user_id" validate:"required"`
	}
)

var validate = validator.New()

func UploadCV(container *container.Container, fileModule *files_module.FilesModule) echo.HandlerFunc {
	return func(c echo.Context) error {
		_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var cvData CVData

		if err := c.Bind(&cvData); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})

		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&cvData); validationErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": validationErr.Error()})
		}

		//We want to upload the CV to s3 files and save the File Object reference in the user profile
		time.Sleep(4 * time.Second)

		//We will upsert the user profile with the new file object reference

		return c.JSON(http.StatusOK, &echo.Map{"message": "success"})
	}
}
