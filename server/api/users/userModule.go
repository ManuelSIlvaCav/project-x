package users

import (
	interfaces "server/api/interfaces"
	handlers "server/api/users/handlers"
	"server/api/users/repository"
	"server/container"
	"server/router"
)

type UserModule struct {
	UserRepository repository.UserRepository
}

func NewUserModule(container *container.Container,
	router *router.Router) *UserModule {

	userRepository := repository.NewUserMongoRepository(container)

	routes := []interfaces.Route{}
	routes = append(routes,
		router.BuildRoute("GET", "", handlers.Users(container, userRepository)),
		router.BuildRoute("POST", "/register", handlers.Register(container, userRepository)))

	userModule := &UserModule{
		UserRepository: userRepository,
	}
	router.SetRoutes("/users", routes)
	return userModule
}
