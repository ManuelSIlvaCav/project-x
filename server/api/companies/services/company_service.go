package companies_services

import (
	"context"
	companies_models "server/api/companies/models"
	companies_repository "server/api/companies/repository"
	"server/api/users"
	user_models "server/api/users/models"
	"server/container"
	"time"
)

type (
	CompanyService interface {
		CreateCompany(companyInput companies_models.CompanySignupInput) (string, error)
	}
)

type companyService struct {
	companyRepository            companies_repository.CompanyRepository
	companyuserProfileRepository companies_repository.CompanyUserProfileRepository
	usersModule                  *users.UserModule
	container                    *container.Container
}

func NewCompanyService(
	container *container.Container,
	companyRepository companies_repository.CompanyRepository,
	companyUserProfileRepository companies_repository.CompanyUserProfileRepository,
	usersModule *users.UserModule,
) *companyService {
	return &companyService{
		container:                    container,
		companyRepository:            companyRepository,
		companyuserProfileRepository: companyUserProfileRepository,
		usersModule:                  usersModule,
	}
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
