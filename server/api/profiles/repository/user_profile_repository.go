package profiles_repository

import (
	"context"
	profiles_models "server/api/profiles/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserProfilesRepository interface {
	// SaveProfile saves a profile in the DB
	CreateUserProfile(newProfile profiles_models.UserProfile) (string, error)
	// GetProfile gets a profile from the DB
	GetUserProfile() (string, error)
	// UpdateUserProfileWorkExperience updates the work experience of a user
	UpdateUserProfileWorkExperience(userId string, workExperience profiles_models.WorkExperience) (string, error)
}

type userProfilesRepository struct {
	container *container.Container
}

func NewUserProfilesRepository(container *container.Container) *userProfilesRepository {
	return &userProfilesRepository{container}
}

func (repo *userProfilesRepository) CreateUserProfile(newProfile profiles_models.UserProfile) (string, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")
	result, err := userCollection.InsertOne(ctx, newProfile)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (repo *userProfilesRepository) GetUserProfile() (string, error) {
	return "GetUserProfile", nil
}

func (repo *userProfilesRepository) UpdateUserProfileWorkExperience(userId string, workExperience profiles_models.WorkExperience) (string, error) {
	ctx := context.Background()
	logger := repo.container.GetLogger()
	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")

	objectUserID, _ := primitive.ObjectIDFromHex(userId)
	filter := bson.D{{Key: "userId", Value: objectUserID}}
	workExperience.ID = primitive.NewObjectID()
	update := bson.M{"$push": bson.M{"workExperiences": workExperience}}

	logger.Info("Updating work experience", "filter", filter, "update", update)

	var updatedDoc profiles_models.UserProfile
	err := userCollection.FindOneAndUpdate(ctx, filter, update).Decode(&updatedDoc)

	if err != nil {
		return "", err
	}

	logger.Info("UpsertedID: ", "result", updatedDoc)

	return updatedDoc.ID, nil
}

func (repo *userProfilesRepository) GetUserProfileWorkExperience(userId string) (*profiles_models.WorkExperience, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")
	filter := primitive.D{{Key: "user_id", Value: userId}}
	workExperience := userCollection.FindOne(ctx, filter)

	var workExperienceFound profiles_models.WorkExperience
	err := workExperience.Decode(&workExperienceFound)

	if err != nil {
		return nil, err
	}

	return &workExperienceFound, nil
}
