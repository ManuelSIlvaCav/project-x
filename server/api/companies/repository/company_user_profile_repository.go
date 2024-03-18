package companies_repository

import (
	"context"
	companies_models "server/api/companies/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	CompanyUserProfileRepository interface {
		CreateCompanyUserProfile(companyId string, userId string, companyUserProfile companies_models.CompanyUserProfile) (string, error)
	}
)

type companyUserProfileRepository struct {
	container *container.Container
}

func NewCompanyUserProfileRepository(container *container.Container) *companyUserProfileRepository {
	return &companyUserProfileRepository{container: container}
}

func (repo *companyUserProfileRepository) CreateCompanyUserProfile(companyId string, userId string, companyUserProfile companies_models.CompanyUserProfile) (string, error) {
	ctx := context.Background()

	companyUserProfileCollection := (repo.container.GetMongoDB()).GetCollection("company_user_profiles")

	companyObjectId, _ := primitive.ObjectIDFromHex(companyId)
	userObjectId, _ := primitive.ObjectIDFromHex(userId)

	companyUserProfile.UserID = &userObjectId
	companyUserProfile.CompanyID = &companyObjectId

	logger := repo.container.GetLogger()
	logger.Info("Creating company user profile", "companyUserProfile", companyUserProfile)

	result, err := companyUserProfileCollection.InsertOne(ctx, companyUserProfile)

	if err != nil {
		return "", err
	}

	insertedID := result.InsertedID.(primitive.ObjectID).Hex()

	return insertedID, nil
}
