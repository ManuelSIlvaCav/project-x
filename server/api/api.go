package api

import (
	"fmt"
	"server/api/users"
	"server/container"
)

type API struct {
	userModule users.UserModule
}

func LoadAPIModules(container container.Container) *API {
	apiObj := &API{
		userModule: users.NewUserModule(container),
	}
	return apiObj
}

func (c *API) GetUserModule() users.UserModule {
	fmt.Printf("Hello from api getUserModule")
	return c.userModule
}
