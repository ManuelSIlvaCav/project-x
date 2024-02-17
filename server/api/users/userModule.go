package users

import (
	users_handlers "server/api/users/handlers"
	"server/api/users/repository"
	"server/container"

	"github.com/labstack/echo/v4"
)

type UserModule interface {
	Routes(group *echo.Group) *echo.Group
}

type userModule struct {
	users           echo.HandlerFunc
	createUser      echo.HandlerFunc
	container       container.Container
	userRespository repository.UserRepository
}

func NewUserModule(container container.Container) UserModule {
	userRepository := repository.NewUserMongoRepository(container)

	return &userModule{
		users:           users_handlers.Users(container),
		createUser:      users_handlers.CreateUser(container, userRepository),
		container:       container,
		userRespository: userRepository,
	}
}

func (c *userModule) Routes(group *echo.Group) *echo.Group {
	group.GET("", c.users)
	group.POST("", c.createUser)
	return group
}

// Function that returns a map of "route": {handler, method}
func (c *userModule) GetRoutes() map[string]map[string]echo.HandlerFunc {
	return map[string]map[string]echo.HandlerFunc{
		"/users": {
			"GET":  c.users,
			"POST": c.createUser,
		},
	}
}
