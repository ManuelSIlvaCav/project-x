package main

import (
	"context"
	"fmt"
	"server/api"
	"server/container"
	"server/router"

	"github.com/labstack/echo/v4"
	"go.uber.org/fx"
)

func registerHooks(lifecycle fx.Lifecycle, e *echo.Echo, container *container.Container, router *router.Router, api *api.Api) {
	lifecycle.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			logger := container.GetLogger()
			logger.Info(fmt.Sprintf("Server started on :%s asd", container.GetConfig().Port))
			go e.Start(fmt.Sprintf(":%s", container.GetConfig().Port))
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return e.Shutdown(ctx)
		},
	})
}

func main() {

	fmt.Println("Starting server wth new log vv3")

	fx.New(fx.Options(
		container.Modules,
		api.Modules,
		//users.Modules,
		router.Modules,
		fx.Provide(NewServer),
		fx.Invoke(registerHooks),
	)).Run()

}
