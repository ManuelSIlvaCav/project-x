package repository

import (
	"context"
	user_models "server/api/users/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	CreateUser(user user_models.User) (string, error)
	GetUser(username string, password string) (*user_models.User, error)
	GetUserByID(id string) (*user_models.User, error)
}

type userRepository struct {
	container *container.Container
}

func NewUserRepository(container *container.Container) *userRepository {
	return &userRepository{container: container}
}

func (repo *userRepository) CreateUser(user user_models.User) (string, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")

	result, err := userCollection.InsertOne(ctx, user)

	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil

}

func (repo *userRepository) GetUser(email string, password string) (*user_models.User, error) {
	ctx := context.Background()
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

// Get user by id
func (repo *userRepository) GetUserByID(id string) (*user_models.User, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")
	objectID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.D{{Key: "_id", Value: objectID}}

	user := userCollection.FindOne(ctx, filter)

	var userFound user_models.User
	err := user.Decode(&userFound)

	if err != nil {
		return nil, err
	}
	//If we don't find it, we return an error
	return &userFound, nil
}
