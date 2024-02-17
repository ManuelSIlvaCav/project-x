package auth

import (
	"server/container"

	"github.com/labstack/echo/v4"
)

type AuthModule interface {
	Routes(group *echo.Group) *echo.Group
}

type authModule struct {
}

func NewAuthModule(container container.Container) AuthModule {
	return &authModule{}
}

func (c *authModule) Routes(group *echo.Group) *echo.Group {
	return group
}
