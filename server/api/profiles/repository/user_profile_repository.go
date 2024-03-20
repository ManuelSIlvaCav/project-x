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
	GetUserProfile(profileId string) (*profiles_models.UserProfile, error)
	// UpdateUserProfileWorkExperience updates the work experience of a user
	UpdateUserProfileWorkExperience(profileId string, workExperienceId string, workExperience profiles_models.WorkExperience) (*profiles_models.UserProfile, error)

	UpdateUserProfileEducation(profileId string, educationId string, education profiles_models.Education) (*profiles_models.UserProfile, error)

	// UpdateUserProfileEducation updates the education of a user
	UpdateProfileCV(profileId string, fileId string) (bool, error)
}

type userProfilesRepository struct {
	container *container.Container
}

func NewUserProfilesRepository(container *container.Container) *userProfilesRepository {
	//We setup the indexes for the user_profiles collection
	indexes := []mongo.IndexModel{}
	indexes = append(indexes, mongo.IndexModel{
		Keys: bson.D{{Key: "userId", Value: 1}},
	}, mongo.IndexModel{
		Keys: bson.D{{Key: "cvFileId", Value: 1}},
	})
	container.GetMongoDB().PopulateIndexes("user_profiles", indexes)
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

	logger := repo.container.GetLogger()
	ctx := context.TODO()
	userCollection := repo.container.GetMongoDB().GetCollection("user_profiles")
	objectID, _ := primitive.ObjectIDFromHex(userId)

	matchStage := bson.D{
		{
			Key: "$match", Value: bson.D{
				{Key: "userId", Value: objectID},
			},
		},
	}

	lookupStage := bson.D{
		{
			Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "files"},
				{Key: "localField", Value: "cvFileId"},
				{Key: "foreignField", Value: "_id"},
				{Key: "as", Value: "cv"},
			},
		},
	}

	unwindStage := bson.D{{Key: "$unwind", Value: bson.D{{Key: "path", Value: "$cv"}, {Key: "preserveNullAndEmptyArrays", Value: true}}}}

	resCursor, err := userCollection.Aggregate(ctx, mongo.Pipeline{matchStage, lookupStage, unwindStage})

	if err != nil {
		logger.Error("Error aggregating", "error", err)
	}

	var resultProfile []bson.M

	if err = resCursor.All(ctx, &resultProfile); err != nil {
		logger.Error("Error getting result", "error", err)
		return nil, err
	}

	if len(resultProfile) == 0 {
		return nil, errors.New("no profile found for user")
	}

	// Create a new instance of UserProfile
	userProfile := &profiles_models.UserProfile{}

	// Assign values from resultProfile[0] to userProfile
	bsonBytes, _ := bson.Marshal(resultProfile[0])
	bson.Unmarshal(bsonBytes, userProfile)

	return userProfile, nil

}

func (repo *userProfilesRepository) UpdateProfileCV(userId string, fileId string) (bool, error) {
	ctx := context.Background()
	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")

	objectUserID, userIdObjectError := primitive.ObjectIDFromHex(userId)

	if userIdObjectError != nil {
		return false, errors.New("could not parse user id")
	}

	objectFileID, fileIdObjectError := primitive.ObjectIDFromHex(fileId)

	if fileIdObjectError != nil {
		return false, errors.New("could not parse file id")
	}

	filter := bson.D{{Key: "userId", Value: objectUserID}}
	update := bson.M{"$set": bson.M{"cvFileId": objectFileID}}

	_, err := userCollection.UpdateOne(ctx, filter, update)

	if err != nil {
		return false, err
	}

	return true, nil
}

func (repo *userProfilesRepository) UpdateUserProfileWorkExperience(profileId string, workExperienceId string, workExperience profiles_models.WorkExperience) (*profiles_models.UserProfile, error) {
	logger := repo.container.GetLogger()
	ctx := context.Background()

	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")

	objectProfileId, userIdObjectError := primitive.ObjectIDFromHex(profileId)

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

		filter = bson.D{{Key: "_id", Value: objectProfileId}, {Key: "workExperiences._id", Value: objectWorkExperienceID}}

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
		filter = bson.D{{Key: "_id", Value: objectProfileId}}
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

func (repo *userProfilesRepository) UpdateUserProfileEducation(profileId string, educationId string, education profiles_models.Education) (*profiles_models.UserProfile, error) {
	logger := repo.container.GetLogger()
	ctx := context.Background()

	userCollection := (repo.container.GetMongoDB()).GetCollection("user_profiles")

	objectProfileID, userIdObjectError := primitive.ObjectIDFromHex(profileId)

	if userIdObjectError != nil {
		return nil, errors.New("could not parse user id")
	}

	var filter bson.D
	var update bson.M

	if educationId != "" {
		//We need to update the work experience
		objectEducationId, err := primitive.ObjectIDFromHex(educationId)

		if err != nil {
			return nil, errors.New("could not parse work experience id")
		}

		filter = bson.D{{Key: "_id", Value: objectProfileID}, {Key: "education._id", Value: objectEducationId}}

		setData := bson.M{}

		if education.SchoolName != "" {
			setData["education.$.schoolName"] = education.SchoolName
		}
		if education.StartDateYear != "" {
			setData["education.$.startDateYear"] = education.StartDateYear
		}
		if education.EndDateYear != "" {
			setData["education.$.endDateYear"] = education.EndDateYear
		}
		if education.Description != "" {
			setData["education.$.description"] = education.Description
		}

		update = bson.M{"$set": setData}

	} else {
		//We need to create a new work experience
		filter = bson.D{{Key: "_id", Value: objectProfileID}}
		education.ID = primitive.NewObjectID()
		update = bson.M{"$push": bson.M{"education": education}}
	}

	logger.Info("Updating Education experience", "filter", filter, "update", update)

	var updatedDoc profiles_models.UserProfile
	opts := &options.FindOneAndUpdateOptions{}
	opts.SetReturnDocument(options.After)
	err := userCollection.FindOneAndUpdate(ctx, filter, update, opts).Decode(&updatedDoc)

	logger.Warn("Updated Education experience", "updatedDoc", updatedDoc, "err", err)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("could not find user profile")
		}
		return nil, err
	}

	return &updatedDoc, nil
}
