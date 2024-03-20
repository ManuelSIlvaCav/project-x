package api

import (
	"server/api/auth"
	"server/api/companies"
	"server/api/emails"
	"server/api/profiles"
	"server/api/users"
	"server/container"
	"server/router"
)

type Api struct {
}

func NewAPI(container *container.Container, router *router.Router,
	usersModule *users.UserModule,
	authModule *auth.AuthModule,
	profilesModule *profiles.ProfilesModule,
	emailsModule *emails.EmailsModule,
	companyModule *companies.CompanyModule,
) *Api {

	apiObj := &Api{}
	return apiObj
}
