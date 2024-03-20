package auth

import (
	"server/api/users"
	"server/container"
	"server/router"

	handlers "server/api/auth/handlers"
	interfaces "server/api/interfaces"
)

type AuthModule struct {
}

func NewAuthModule(container *container.Container, router *router.Router, userModule *users.UserModule) *AuthModule {
	authModule := &AuthModule{}
	routes := []interfaces.Route{}
	routes = append(routes,
		router.BuildRoute("POST", "/login", handlers.Login(container, userModule)),
	)
	router.SetRoutes("/auth", routes)
	return authModule
}
