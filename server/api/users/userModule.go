package users

import (
	interfaces "server/api/interfaces"
	"server/api/profiles"
	handlers "server/api/users/handlers"
	"server/api/users/repository"
	"server/container"
	"server/router"
)

type UserModule struct {
	UserRepository repository.UserRepository
}

func NewUserModule(container *container.Container,
	router *router.Router, profilesModule *profiles.ProfilesModule) *UserModule {

	userRepository := repository.NewUserRepository(container)

	routes := []interfaces.Route{}
	routes = append(routes,
		router.BuildRoute("GET", "", handlers.Users(container, userRepository)),
		router.BuildRoute("POST", "/register", handlers.Register(container, userRepository, profilesModule)))

	userModule := &UserModule{
		UserRepository: userRepository,
	}
	router.SetRoutes("/users", routes)
	return userModule
}
