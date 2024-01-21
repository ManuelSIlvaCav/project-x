package repository

import (
	"context"
	user_models "server/api/users/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user user_models.User) (string, error)
	GetUser(ctx context.Context) error
}

type userMongoRepository struct {
	container container.Container
}

func NewUserMongoRepository(container container.Container) *userMongoRepository {
	return &userMongoRepository{container: container}
}

func (repo *userMongoRepository) CreateUser(ctx context.Context, user user_models.User) (string, error) {
	mongoDB := (repo.container.GetMongoDB()).GetClient()
	userCollection := mongoDB.Database("project-x").Collection("users")

	result, err := userCollection.InsertOne(ctx, user)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).String(), nil

}

func (repo *userMongoRepository) GetUser(ctx context.Context) error {
	return nil
}
