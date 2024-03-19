package companies_repository

import (
	"context"
	companies_models "server/api/companies/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CompanyRepository interface {
	CreateCompany(ctx context.Context, company companies_models.Company) (string, error)
}

type companyRepository struct {
	container *container.Container
}

func NewCompanyRepository(container *container.Container) *companyRepository {
	return &companyRepository{container: container}
}

func (repo *companyRepository) CreateCompany(ctx context.Context, company companies_models.Company) (string, error) {
	if ctx == nil {
		ctx = context.Background()
	}

	companyCollection := (repo.container.GetMongoDB()).GetCollection("companies")

	result, err := companyCollection.InsertOne(ctx, company)

	if err != nil {
		return "", err
	}

	insertedID := result.InsertedID.(primitive.ObjectID).Hex()
	return insertedID, nil
}
