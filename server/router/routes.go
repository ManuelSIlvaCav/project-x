package router

import (
	"context"
	"fmt"
	"net/http"
	"server/container"
	"server/container/utils/config"
	"server/controller"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	interfaces "server/api/interfaces"
)

type Router struct {
	mainGroup *echo.Group
}

func NewRouter(e *echo.Echo, container *container.Container) *Router {
	router := &Router{}

	router.initializeRouter(e, container)
	return router
}

func setCORSConfig(e *echo.Echo, container *container.Container) {
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

func setJWTConfig(e *echo.Echo, container *container.Container) {

	//e.Use(echojwt.WithConfig(jwtConfig))
}

func setErrorController(e *echo.Echo, container *container.Container) {
	errorHandler := controller.NewErrorController(container)
	e.HTTPErrorHandler = errorHandler.JSONError
	e.Use(middleware.Recover())
}

func setHealthController(e *echo.Echo, container *container.Container) {
	healthController := controller.NewHealthController(container)
	fmt.Println(config.APIHealth)
	e.GET(config.APIHealth, func(c echo.Context) error { return healthController.GetHealthCheck(c) })
	// get logger from contaner
	logger := container.GetLogger()
	logger.Info(context.TODO(), "Health check route is set up.")
}

// We register the domain in the group and then we register the routes for that module
// @param domain string
// @param routes map[string][]*interfaces.Route
// @return void
func (r *Router) RegisterRoutes(domain string, routes []interfaces.Route) {
	fmt.Println("Registering routes for domain", domain)
	//Set the group for the domain
	group := r.mainGroup.Group(domain)

	//Register the routes
	for _, route := range routes {

		group.Add(route.Method, route.Path, route.Handler)
	}

}

func (r *Router) initializeRouter(e *echo.Echo, container *container.Container) {
	setCORSConfig(e, container)
	setErrorController(e, container)
	setHealthController(e, container)
	//Set the main group

	r.mainGroup = e.Group("/api/v1")
}

func (r *Router) BuildRoute(method string, path string, handler echo.HandlerFunc) interfaces.Route {
	return interfaces.Route{
		Method:  method,
		Path:    path,
		Handler: handler,
	}
}

func (c *Router) SetRoutes(path string, routes []interfaces.Route) error {
	c.RegisterRoutes(path, routes)
	return nil
}
