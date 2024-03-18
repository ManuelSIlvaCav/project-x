package companies

import (
	companies_handlers "server/api/companies/handlers"
	company_repository "server/api/companies/repository"
	interfaces "server/api/interfaces"
	"server/api/users"
	"server/container"
	"server/router"
)

type CompanyModule struct {
	CompanyRepository            company_repository.CompanyRepository
	CompanyUserProfileRepository company_repository.CompanyUserProfileRepository
}

func NewCompanyModule(container *container.Container, router *router.Router, usersModule *users.UserModule) *CompanyModule {
	companyRepository := company_repository.NewCompanyRepository(container)
	companyUserProfileRepository := company_repository.NewCompanyUserProfileRepository(container)

	routes := []interfaces.Route{}

	routes = append(routes,
		router.BuildRoute("POST", "/signup", companies_handlers.Signup(container, companyRepository, companyUserProfileRepository, usersModule)),
	)

	router.SetRoutes("/companies", routes)

	return &CompanyModule{
		CompanyRepository:            companyRepository,
		CompanyUserProfileRepository: companyUserProfileRepository,
	}
}
