package profiles_handlers

import (
	"context"
	"net/http"
	files_module "server/api/files"
	files_model "server/api/files/models"
	profiles_repository "server/api/profiles/repository"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

func UploadCV(container *container.Container, fileModule *files_module.FilesModule, userProfileRepository profiles_repository.UserProfilesRepository) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()
		logger := container.GetLogger()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		logger.Info("Started uploading cv")

		userId := c.FormValue("user_id")

		if userId == "" {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": "user_id is required"})
		}

		file, err := c.FormFile("cv")
		if err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		src, openErr := file.Open()

		if openErr != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": openErr.Error()})
		}

		defer src.Close()

		//We want to upload the CV to s3 files and save the File Object reference in the user profile
		result, err := fileModule.FileService.UploadFile(file.Filename, src)

		if err != nil {
			logger.Error("Failed to upload CV", "error", err)
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": "failed to upload CV"})
		}

		logger.Info("Saving file file repository and user profile", "result", result)

		fileObject := files_model.File{
			Name: file.Filename,
			Size: file.Size,
			URL:  result,
		}

		fileResult, fileError := fileModule.FilesRepository.SaveFile(fileObject)

		if fileError != nil {
			logger.Error("Failed to save file", "error", fileError)
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": "failed to save file"})
		}

		logger.Info("File saved in db, updating user", "result", fileResult)

		//We need to save the file into collection for future Reference
		_, fileAssignmentError := userProfileRepository.UpdateProfileCV(userId, fileResult)

		if fileAssignmentError != nil {
			logger.Error("Failed to assign file to user", "error", fileAssignmentError)

		}

		return c.JSON(http.StatusOK, &echo.Map{"message": "success"})
	}
}
