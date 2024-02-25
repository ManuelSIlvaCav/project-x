package repository

import (
	"context"
	user_models "server/api/users/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user user_models.User) (string, error)
	GetUser(ctx context.Context, username string, password string) (*user_models.User, error)
}

type userRepository struct {
	container *container.Container
}

func NewUserMongoRepository(container *container.Container) *userRepository {
	return &userRepository{container: container}
}

func (repo *userRepository) CreateUser(ctx context.Context, user user_models.User) (string, error) {
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")

	result, err := userCollection.InsertOne(ctx, user)

	if err != nil {
		return "", err
	}

	repo.container.GetLogger().Info("User inserted successfully", map[string]interface{}{"result": result})

	return result.InsertedID.(primitive.ObjectID).Hex(), nil

}

func (repo *userRepository) GetUser(ctx context.Context, email string, password string) (*user_models.User, error) {
	//We hash the password first to test
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")
	filter := bson.D{{Key: "email", Value: email}, {Key: "password", Value: password}}

	user := userCollection.FindOne(ctx, filter)

	var userFound user_models.User
	err := user.Decode(&userFound)

	if err != nil {
		return nil, err
	}
	//If we don't find it, we return an error
	return &userFound, nil
}
