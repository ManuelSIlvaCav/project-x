package repository

import (
	"context"
	user_models "server/api/users/models"
	"server/container"
	"server/helpers/passwords"

	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserRepository interface {
	CreateUser(user user_models.User) (string, error)
	GetUser(username string) (*user_models.User, error)
	GetUserByID(id string) (*user_models.User, error)

	//Candidates for a service module
	LoginUser(email string, password string) (*user_models.User, error)
}

type userRepository struct {
	container *container.Container
}

func NewUserRepository(container *container.Container) *userRepository {
	indexes := []mongo.IndexModel{}
	indexes = append(indexes, mongo.IndexModel{
		Keys:    bson.D{{Key: "email", Value: 1}},
		Options: options.Index().SetUnique(true),
	})
	container.GetMongoDB().PopulateIndexes("users", indexes)
	return &userRepository{container: container}
}

func (repo *userRepository) CreateUser(user user_models.User) (string, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")

	hashedPassword, err := passwords.Hash(user.Password)
	if err != nil {
		return "", err

	}
	user.Password = hashedPassword

	result, err := userCollection.InsertOne(ctx, user)

	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return "", errors.New("Email already exists")
		}
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil

}

func (repo *userRepository) GetUser(email string) (*user_models.User, error) {
	ctx := context.Background()
	//We hash the password first to test
	userCollection := (repo.container.GetMongoDB()).GetCollection("users")

	filter := bson.D{{Key: "email", Value: email}, {Key: "deleted_at", Value: nil}}

	user := userCollection.FindOne(ctx, filter)

	var userFound user_models.User

	if decodeError := user.Decode(&userFound); decodeError != nil {
		return nil, decodeError
	}
	//If we don't find it, we return an error
	return &userFound, nil
}

// LoginUser logs in a user and validates the password
func (repo *userRepository) LoginUser(email string, password string) (*user_models.User, error) {
	user, err := repo.GetUser(email)

	if err != nil {
		return nil, err
	}

	//Now we validate the password for that user of the email
	if !passwords.Verify(user.Password, password) {
		//Create custom error and return
		return nil, errors.New("Invalid password")
	}
	return user, nil
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
