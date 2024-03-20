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
	CreateUser(ctx context.Context, user user_models.User) (string, error)
	GetUser(email string, filter map[string]interface{}) (*user_models.User, error)
	GetUserByID(id string) (*user_models.User, error)

	//Candidates for a service module
	LoginUser(email string, password string, filter map[string]interface{}) (*user_models.User, error)
}

type userRepository struct {
	container  *container.Container
	collection *mongo.Collection
}

func NewUserRepository(container *container.Container) *userRepository {
	indexes := []mongo.IndexModel{}
	indexes = append(indexes, mongo.IndexModel{
		Keys:    bson.D{{Key: "email", Value: 1}, {Key: "generalRole", Value: 1}},
		Options: options.Index().SetUnique(true),
	})
	container.GetMongoDB().PopulateIndexes("users", indexes)
	return &userRepository{container: container, collection: container.GetMongoDB().GetCollection("users")}
}

func (repo *userRepository) CreateUser(ctx context.Context, user user_models.User) (string, error) {

	if ctx == nil {
		ctx = context.Background()
	}

	hashedPassword, err := passwords.Hash(user.Password)
	if err != nil {
		return "", err

	}
	user.Password = hashedPassword

	opts := &options.InsertOneOptions{}

	result, err := repo.collection.InsertOne(ctx, user, opts)

	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return "", errors.New("Email already exists")
		}
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil

}

func (repo *userRepository) GetUser(email string, filter map[string]interface{}) (*user_models.User, error) {
	ctx := context.Background()
	logger := repo.container.GetLogger()
	//We hash the password first to test

	customFilter := bson.D{
		{Key: "email", Value: email},
		{Key: "generalRole", Value: filter["generalRole"]},
		{Key: "deleted_at", Value: nil},
	}

	var userFound user_models.User

	opts := &options.FindOneOptions{}

	userResult := repo.collection.FindOne(ctx, customFilter, opts)

	if decodeError := userResult.Decode(&userFound); decodeError != nil {
		logger.Error("Error decoding user", "error", decodeError)
		return nil, decodeError
	}
	//If we don't find it, we return an error
	return &userFound, nil
}

// LoginUser logs in a user and validates the password
func (repo *userRepository) LoginUser(email string, password string, filter map[string]interface{}) (*user_models.User, error) {
	user, err := repo.GetUser(email, filter)

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
	objectID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.D{{Key: "_id", Value: objectID}}

	user := repo.collection.FindOne(ctx, filter)

	var userFound user_models.User
	err := user.Decode(&userFound)

	if err != nil {
		return nil, err
	}
	//If we don't find it, we return an error
	return &userFound, nil
}
