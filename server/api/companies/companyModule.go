package companies

import (
	companies_handlers "server/api/companies/handlers"
	company_repository "server/api/companies/repository"
	companies_services "server/api/companies/services"
	interfaces "server/api/interfaces"
	"server/api/job_invites"
	"server/api/users"
	"server/container"
	"server/router"
)

type CompanyModule struct {
	CompanyRepository            company_repository.CompanyRepository
	CompanyUserProfileRepository company_repository.CompanyUserProfileRepository
	CompanyService               companies_services.CompanyService
	JobListingRepository         company_repository.JobListingRepository
}

func NewCompanyModule(container *container.Container, router *router.Router, usersModule *users.UserModule, jobInvitesModule *job_invites.JobInvitesModule) *CompanyModule {
	companyRepository := company_repository.NewCompanyRepository(container)
	companyUserProfileRepository := company_repository.NewCompanyUserProfileRepository(container)
	jobListingRepository := company_repository.NewJobListingRepository(container)

	companyService := companies_services.NewCompanyService(container, companyRepository, companyUserProfileRepository, jobListingRepository,
		usersModule, jobInvitesModule)

	routes := []interfaces.Route{}

	routes = append(routes,
		router.BuildRoute("POST", "/signup", companies_handlers.Signup(container, companyService)),
		router.BuildRoute("POST", "/:company_id/newjob", companies_handlers.NewJob(container, companyService)),
		router.BuildRoute("GET", "/:company_id/jobs", companies_handlers.Jobs(container, companyService)),
	)

	router.SetRoutes("/companies", routes)

	return &CompanyModule{
		CompanyRepository:            companyRepository,
		CompanyUserProfileRepository: companyUserProfileRepository,
		CompanyService:               companyService,
	}
}
