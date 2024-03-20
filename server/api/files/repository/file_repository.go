package files_repository

import (
	"context"
	files_model "server/api/files/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type FilesRepository interface {
	SaveFile(file files_model.File) (string, error)
}

type filesRepository struct {
	container *container.Container
}

func NewFilesRepository(container *container.Container) *filesRepository {
	indexes := []mongo.IndexModel{}
	indexes = append(indexes, mongo.IndexModel{
		Keys: bson.D{{Key: "name", Value: 1}},
	}, mongo.IndexModel{
		Keys: bson.D{{Key: "url", Value: 1}},
	})
	container.GetMongoDB().PopulateIndexes("files", indexes)
	return &filesRepository{container: container}
}

// We insert a new file into S3 and return the ID of the file in the DB
func (repo *filesRepository) SaveFile(file files_model.File) (string, error) {
	ctx := context.Background()
	filesCollection := (repo.container.GetMongoDB()).GetCollection("files")

	result, err := filesCollection.InsertOne(ctx, file)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}
