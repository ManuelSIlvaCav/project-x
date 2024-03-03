package profiles_repository

import (
	"context"
	"errors"
	profiles_models "server/api/profiles/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserProfilesRepository interface {
	// SaveProfile saves a profile in the DB
	CreateUserProfile(newProfile profiles_models.UserProfile) (string, error)
	// GetProfile gets a profile from the DB
	GetUserProfile(userId string) (*profiles_models.UserProfile, error)
	// UpdateUserProfileWorkExperience updates the work experience of a user
	UpdateUserProfileWorkExperience(userId string, workExperienceId string, workExperience profiles_models.WorkExperience) (*profiles_models.UserProfile, error)
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

func (repo *userProfilesRepository) GetUserProfile(userId string) (*profiles_models.UserProfile, error) {
	ctx := context.TODO()
	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")
	objectID, _ := primitive.ObjectIDFromHex(userId)
	filter := bson.D{{Key: "userId", Value: objectID}}

	userProfile := userCollection.FindOne(ctx, filter)

	var userProfileFound profiles_models.UserProfile
	err := userProfile.Decode(&userProfileFound)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &userProfileFound, nil
}

func (repo *userProfilesRepository) UpdateUserProfileWorkExperience(userId string, workExperienceId string, workExperience profiles_models.WorkExperience) (*profiles_models.UserProfile, error) {
	logger := repo.container.GetLogger()
	ctx := context.Background()

	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")

	objectUserID, userIdObjectError := primitive.ObjectIDFromHex(userId)

	if userIdObjectError != nil {
		return nil, errors.New("could not parse user id")
	}

	var filter bson.D
	var update bson.M

	if workExperienceId != "" {
		//We need to update the work experience
		objectWorkExperienceID, err := primitive.ObjectIDFromHex(workExperienceId)

		if err != nil {
			return nil, errors.New("could not parse work experience id")
		}

		filter = bson.D{{Key: "userId", Value: objectUserID}, {Key: "workExperiences._id", Value: objectWorkExperienceID}}

		setData := bson.M{}

		if workExperience.Company != "" {
			setData["workExperiences.$.company"] = workExperience.Company
		}
		if workExperience.Role != "" {
			setData["workExperiences.$.role"] = workExperience.Role
		}
		if workExperience.StartDateMonth != "" {
			setData["workExperiences.$.startDateMonth"] = workExperience.StartDateMonth
		}
		if workExperience.StartDateYear != "" {
			setData["workExperiences.$.startDateYear"] = workExperience.StartDateYear
		}
		if workExperience.EndDateMonth != "" {
			setData["workExperiences.$.endDateMonth"] = workExperience.EndDateMonth
		}
		if workExperience.EndDateYear != "" {
			setData["workExperiences.$.endDateYear"] = workExperience.EndDateYear
		}

		if workExperience.Descriptions != nil && len(workExperience.Descriptions) > 0 {
			setData["workExperiences.$.descriptions"] = workExperience.Descriptions
		}
		update = bson.M{"$set": setData}

	} else {
		//We need to create a new work experience
		filter = bson.D{{Key: "userId", Value: objectUserID}}
		workExperience.ID = primitive.NewObjectID()
		update = bson.M{"$push": bson.M{"workExperiences": workExperience}}
	}

	logger.Info("Updating work experience", "filter", filter, "update", update)

	var updatedDoc profiles_models.UserProfile
	opts := &options.FindOneAndUpdateOptions{}
	opts.SetReturnDocument(options.After)
	err := userCollection.FindOneAndUpdate(ctx, filter, update, opts).Decode(&updatedDoc)

	logger.Warn("Updated work experience", "updatedDoc", updatedDoc, "err", err)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find user profile")
		}
		return nil, err
	}

	return &updatedDoc, nil
}
