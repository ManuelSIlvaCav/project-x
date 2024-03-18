package companies_repository

import (
	"context"
	companies_models "server/api/companies/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CompanyRepository interface {
	CreateCompany(company companies_models.Company) (string, error)
}

type companyRepository struct {
	container *container.Container
}

func NewCompanyRepository(container *container.Container) *companyRepository {
	return &companyRepository{container: container}
}

func (repo *companyRepository) CreateCompany(company companies_models.Company) (string, error) {
	ctx := context.Background()
	companyCollection := (repo.container.GetMongoDB()).GetCollection("companies")

	// hashedPassword, err := passwords.Hash(company.Password)
	// if err != nil {
	// 	return "", err

	// }

	// company.Password = hashedPassword

	result, err := companyCollection.InsertOne(ctx, company)

	if err != nil {
		return "", err
	}

	insertedID := result.InsertedID.(primitive.ObjectID).Hex()
	return insertedID, nil
}
