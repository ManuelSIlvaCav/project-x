package main

import (
	"context"
	"fmt"
	"server/container"
	"server/router"

	"github.com/labstack/echo/v4"
	"go.uber.org/fx"
)

func registerHooks(lifecycle fx.Lifecycle, e *echo.Echo, container *container.Container) {
	lifecycle.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {

			logger := container.GetLogger()
			logger.Info(ctx, "Server started", nil)
			logger.Info(ctx, "Server started7", nil)
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
		router.Modules,
		fx.Provide(NewServer),
		fx.Invoke(registerHooks),
	)).Run()

	// e := echo.New()

	// if err := e.Start(fmt.Sprintf(":%s", conf.Port)); err != nil {
	// 	//e.Logger.Fatal(err.Error())
	// 	fmt.Printf("Failed to start server: %s", err.Error())
	// }

	//defer rep.Close()

}
