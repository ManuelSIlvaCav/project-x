package companies_handlers

import (
	"context"
	"net/http"
	companies_models "server/api/companies/models"
	company_repository "server/api/companies/repository"
	"server/api/users"
	user_models "server/api/users/models"
	"server/container"
	"time"

	"github.com/labstack/echo/v4"
)

type (
	CompanySignupInput struct {
		CompanyName    string `json:"company_name" validate:"required"`
		CompanyWebsite string `json:"company_website" validate:"required"`
		AdminEmail     string `json:"admin_email" validate:"required,email"`
		Password       string `json:"password" validate:"required,min=6,max=20" errormgs:"Password is required and must be between 6 and 20 characters"`
	}
)

func Signup(
	container *container.Container,
	companyRepository company_repository.CompanyRepository, companyUserProfileRepository company_repository.CompanyUserProfileRepository,
	userModule *users.UserModule,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.Background()

		_, cancel := context.WithTimeout(ctx, 10*time.Second)

		defer cancel()

		var companyInput CompanySignupInput

		if err := c.Bind(&companyInput); err != nil {
			return c.JSON(http.StatusBadRequest, &echo.Map{"message": err.Error()})
		}

		validator := container.GetCustomValidator()
		structToValidate := &companyInput

		if validationErrs := validator.ValidateStruct(*structToValidate); len(validationErrs) > 0 {

			return c.JSON(http.StatusBadRequest, &echo.Map{"errors": validationErrs})
		}

		//We create the company and the company user profile at the same time
		userId, err := createUser(userModule, companyInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		companyId, err := createCompanyResource(
			userId,
			companyRepository,
			companyUserProfileRepository,
			companyInput)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, &echo.Map{"message": err.Error()})
		}

		return c.JSON(http.StatusCreated, &echo.Map{"message": "success", "data": &echo.Map{"id": companyId}})
	}
}

func createUser(
	userModule *users.UserModule,
	companyInput CompanySignupInput,
) (string, error) {
	//We create the user
	newUser := user_models.User{
		FirstName:   "Company",
		LastName:    "Admin",
		Email:       companyInput.AdminEmail,
		Password:    companyInput.Password,
		GeneralRole: "company",
		CreatedAt:   time.Now(),
	}
	userId, err := userModule.UserRepository.CreateUser(newUser)
	if err != nil {
		return "", err
	}

	return userId, nil

}

func createCompanyResource(
	userId string,
	companyRepository company_repository.CompanyRepository,
	companyUserProfile company_repository.CompanyUserProfileRepository,
	companyInput CompanySignupInput) (string, error) {

	//We create the company and then the user profile
	//TODO we need to create everything in transaction with rollback if something fails
	nowTime := time.Now()

	newCompany := companies_models.Company{
		CompanyName:    companyInput.CompanyName,
		Country:        "UK", //TODO make it flexible Sorry.
		AdminEmail:     companyInput.AdminEmail,
		CompanyWebsite: companyInput.CompanyWebsite,
		//Password:       companyInput.Password,
		CreatedAt: nowTime,
	}

	companyId, err := companyRepository.CreateCompany(newCompany)

	if err != nil {
		return "", err
	}

	//We create the company user profile
	newCompanyUserProfile := companies_models.CompanyUserProfile{

		CreatedAt: nowTime,
	}

	_, err = companyUserProfile.CreateCompanyUserProfile(companyId, userId, newCompanyUserProfile)

	if err != nil {
		return "", err
	}

	return "companyId", nil
}
