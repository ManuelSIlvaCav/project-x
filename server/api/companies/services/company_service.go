package companies_services

import (
	"context"
	companies_models "server/api/companies/models"
	companies_repository "server/api/companies/repository"
	"server/api/job_invites"
	job_invites_models "server/api/job_invites/models"
	"server/api/users"
	user_models "server/api/users/models"
	"server/container"
	"time"
)

type (
	CompanyService interface {
		CreateCompany(companyInput companies_models.CompanySignupInput) (string, error)
		CreateJobListing(companyId string, jobInput companies_models.JobListing) (string, error)
		GetJobListings(companyId string, prevCursor string, limit int) ([]companies_models.JobListing, error)
		GetCandidateRecommendations(companyId string, jobId string, prevCursor string, limit int) ([]job_invites_models.CandidateRecommendation, error)
	}
)

type companyService struct {
	companyRepository            companies_repository.CompanyRepository
	companyuserProfileRepository companies_repository.CompanyUserProfileRepository
	jobListingRepository         companies_repository.JobListingRepository
	jobInvitesModule             *job_invites.JobInvitesModule
	usersModule                  *users.UserModule
	container                    *container.Container
}

func NewCompanyService(
	container *container.Container,
	companyRepository companies_repository.CompanyRepository,
	companyUserProfileRepository companies_repository.CompanyUserProfileRepository,
	jobListingRepository companies_repository.JobListingRepository,
	usersModule *users.UserModule,
	jobInviteModule *job_invites.JobInvitesModule,
) *companyService {

	return &companyService{
		container:                    container,
		companyRepository:            companyRepository,
		companyuserProfileRepository: companyUserProfileRepository,
		jobListingRepository:         jobListingRepository,
		jobInvitesModule:             jobInviteModule,
		usersModule:                  usersModule,
	}
}

func (service *companyService) GetJobListings(companyId string, prevCursor string, limit int) ([]companies_models.JobListing, error) {
	//We get the job listings
	emptyJobListings := []companies_models.JobListing{}
	jobListings, err := service.jobListingRepository.GetJobListingsByCompanyID(companyId, prevCursor, limit)

	if err != nil {
		return emptyJobListings, err
	}

	if len(jobListings) == 0 {
		return emptyJobListings, nil
	}

	return jobListings, nil
}

func (service *companyService) CreateJobListing(companyId string, jobInput companies_models.JobListing) (string, error) {
	//We create the job listing

	jobId, err := service.jobListingRepository.CreateJobListing(companyId, jobInput)

	if err != nil {
		return "", err
	}

	return jobId, nil
}

func (service *companyService) CreateCompany(companyInput companies_models.CompanySignupInput) (string, error) {
	//Initiate the transaction
	ctx := context.Background()
	nowTime := time.Now()

	//We create the user
	newUser := user_models.User{
		FirstName:   "Company",
		LastName:    "Admin",
		Email:       companyInput.AdminEmail,
		Password:    companyInput.Password,
		GeneralRole: "company",
		CreatedAt:   nowTime,
	}
	userId, err := service.usersModule.UserRepository.CreateUser(ctx, newUser)

	if err != nil {
		return "", err
	}

	//We create the company and then the user profile

	newCompany := companies_models.Company{
		CompanyName:    companyInput.CompanyName,
		Country:        "UK", //TODO make it flexible Sorry.
		AdminEmail:     companyInput.AdminEmail,
		CompanyWebsite: companyInput.CompanyWebsite,
		//Password:       companyInput.Password,
		CreatedAt: nowTime,
	}

	companyId, err := service.companyRepository.CreateCompany(ctx, newCompany)

	if err != nil {
		return "", err
	}

	//We create the company user profile
	newCompanyUserProfile := companies_models.CompanyUserProfile{
		CreatedAt: nowTime,
	}

	_, err = service.companyuserProfileRepository.CreateCompanyUserProfile(ctx, companyId, userId, newCompanyUserProfile)

	if err != nil {
		return "", err
	}

	return "companyId", nil
}

func (service *companyService) GetCandidateRecommendations(companyId string, jobId string, prevCursor string, limit int) ([]job_invites_models.CandidateRecommendation, error) {
	//We get the candidate recommendations
	emptyCandidateRecommendations := []job_invites_models.CandidateRecommendation{}

	filter := &job_invites_models.CandidateRecommendationFilter{
		CompanyID: companyId,
		JobID:     jobId,
	}

	recommendations, err := service.jobInvitesModule.CandidateRecommendationRepository.GetCandidateRecommendations(filter, prevCursor, limit)

	if err != nil {
		return emptyCandidateRecommendations, err
	}

	if len(recommendations) > 0 {
		return recommendations, nil
	}

	return emptyCandidateRecommendations, nil

}

//EXAMPLE TRANSACTION
// mongoDB := service.container.GetMongoDB()

// 	mongoDB.WithTransaction(func(sc mongo.SessionContext) error {
// 		//Initiate the transaction

// 		//We create the user
// 		newUser := user_models.User{
// 			FirstName:   "Company",
// 			LastName:    "Admin",
// 			Email:       companyInput.AdminEmail,
// 			Password:    companyInput.Password,
// 			GeneralRole: "company",
// 			CreatedAt:   time.Now(),
// 		}
// 		userId, err := service.usersModule.UserRepository.CreateUser(sc, newUser)
// 		if err != nil {
// 			return err
// 		}

// 		//We create the company and then the user profile
// 		nowTime := time.Now()

// 		newCompany := companies_models.Company{
// 			CompanyName:    companyInput.CompanyName,
// 			Country:        "UK", //TODO make it flexible Sorry.
// 			AdminEmail:     companyInput.AdminEmail,
// 			CompanyWebsite: companyInput.CompanyWebsite,
// 			//Password:       companyInput.Password,
// 			CreatedAt: nowTime,
// 		}

// 		companyId, err := service.companyRepository.CreateCompany(sc, newCompany)

// 		if err != nil {
// 			return err
// 		}

// 		//We create the company user profile
// 		newCompanyUserProfile := companies_models.CompanyUserProfile{
// 			CreatedAt: nowTime,
// 		}

// 		_, err = service.companyuserProfileRepository.CreateCompanyUserProfile(sc, companyId, userId, newCompanyUserProfile)

// 		if err != nil {
// 			return err
// 		}
// 		if err = sc.CommitTransaction(sc); err != nil {
// 			return err
// 		}

// 		return nil
// 	})
