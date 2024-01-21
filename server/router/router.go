package router

import (
	"fmt"
	"net/http"
	"server/api"
	"server/container"
	"server/controller"
	"server/utils/config"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init(e *echo.Echo, container container.Container, api *api.API) {
	setCORSConfig(e, container)

	setErrorController(e, container)
	setHealthController(e, container)
	setAPIRoutes(e, container, api)
}

func setCORSConfig(e *echo.Echo, container container.Container) {
	if container.GetConfig().Extension.CorsEnabled {
		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowCredentials:                         true,
			UnsafeWildcardOriginWithAllowCredentials: true,
			AllowOrigins:                             []string{"*"},
			AllowHeaders: []string{
				echo.HeaderAccessControlAllowHeaders,
				echo.HeaderContentType,
				echo.HeaderContentLength,
				echo.HeaderAcceptEncoding,
			},
			AllowMethods: []string{
				http.MethodGet,
				http.MethodPost,
				http.MethodPut,
				http.MethodDelete,
			},
			MaxAge: 86400,
		}))
	}
}

func setErrorController(e *echo.Echo, container container.Container) {
	errorHandler := controller.NewErrorController(container)
	e.HTTPErrorHandler = errorHandler.JSONError
	e.Use(middleware.Recover())
}

func setHealthController(e *echo.Echo, container container.Container) {
	healthController := controller.NewHealthController(container)
	fmt.Println(config.APIHealth)
	e.GET(config.APIHealth, func(c echo.Context) error { return healthController.GetHealthCheck(c) })
}

func setAPIRoutes(e *echo.Echo, container container.Container, api *api.API) {
	//Build an api group
	apiGroup := e.Group("/api/v1")

	usersGroup := apiGroup.Group("/users")
	userModule := api.GetUserModule()
	userModule.Routes(usersGroup)
}
