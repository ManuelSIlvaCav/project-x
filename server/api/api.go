package api

import (
	"server/api/auth"
	"server/api/users"
	"server/container"
)

type API interface {
	GetUserModule() users.UserModule
}

type api struct {
	userModule users.UserModule
	authModule auth.AuthModule
}

func NewAPI(container container.Container) *api {
	apiObj := &api{
		userModule: users.NewUserModule(container),
		authModule: auth.NewAuthModule(container),
	}
	return apiObj
}

func (a *api) GetUserModule() users.UserModule {
	return a.userModule
}
