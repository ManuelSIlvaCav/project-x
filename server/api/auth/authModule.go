package auth

import (
	"server/api/users"
	"server/container"
	"server/router"

	handlers "server/api/auth/handlers"
	interfaces "server/api/interfaces"

	"github.com/labstack/echo/v4"
)

type AuthModule struct {
	loginHandler echo.HandlerFunc
}

func NewAuthModule(container *container.Container, router *router.Router, userModule *users.UserModule) *AuthModule {
	authModule := &AuthModule{
		loginHandler: handlers.Login(container, userModule),
	}
	authModule.SetRoutes(router)
	return authModule
}

func (c *AuthModule) GetRoutes() []interfaces.Route {
	routes := []interfaces.Route{}
	routes = append(routes,
		interfaces.Route{
			Method:  "POST",
			Path:    "/login",
			Handler: c.loginHandler,
		},
	)
	return routes
}

func (c *AuthModule) SetRoutes(router *router.Router) error {
	routes := c.GetRoutes()
	router.RegisterRoutes("/auth", routes)
	return nil
}
