package companies_repository

import (
	companies_models "server/api/companies/models"
	"server/container"
)

type (
	JobListingRepository interface {
		CreateJobListing(companyId string, jobListing companies_models.JobListing) (string, error)
	}
	jobListingRepository struct {
		container *container.Container
	}
)

func NewJobListingRepository(container *container.Container) *jobListingRepository {
	return &jobListingRepository{container: container}
}

func (repo *jobListingRepository) CreateJobListing(companyId string, jobListing companies_models.JobListing) (string, error) {
	// ...
	return "", nil
}
