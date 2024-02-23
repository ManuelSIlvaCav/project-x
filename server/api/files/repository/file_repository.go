package files_repository

import (
	"context"
	files_model "server/api/files/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FilesRepository interface {
	SaveFile() (string, error)
}

type filesRepository struct {
	container *container.Container
}

func NewFilesRepository(container *container.Container) *filesRepository {
	return &filesRepository{container: container}
}

// We insert a new file into S3 and return the ID of the file in the DB
func (repo *filesRepository) SaveFile(ctx context.Context, file files_model.File) (string, error) {
	filesCollection := (repo.container.GetMongoDB()).GetCollection("files")

	result, err := filesCollection.InsertOne(ctx, file)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}
