package api

import (
	"server/api/auth"
	"server/api/profiles"
	"server/api/users"
	"server/container"
	"server/router"
)

type Api struct {
	userModule *users.UserModule
	authModule *auth.AuthModule
}

func NewAPI(container *container.Container, router *router.Router,
	usersModule *users.UserModule,
	authModule *auth.AuthModule, profilesModule *profiles.ProfilesModule) *Api {

	apiObj := &Api{
		userModule: usersModule,
		authModule: authModule,
	}
	return apiObj
}
