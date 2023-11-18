package main

import (
	"embed"
	"fmt"
	"server/config"
	"server/container"
	"server/logger"
	"server/router"

	"github.com/labstack/echo/v4"

	helper "server/helpers"
)

//go:embed resources/config/application.*.yml
var yamlFile embed.FS

//go:embed resources/config/zaplogger.*.yml
var zapYamlFile embed.FS

func main() {
	helper.Help()

	e := echo.New()
	conf, env := config.LoadAppConfig(yamlFile)
	logger := logger.InitLogger(env, zapYamlFile)

	container := container.NewContainer(conf, env, logger)

	router.Init(e, container)

	if err := e.Start(":8080"); err != nil {
		//e.Logger.Fatal(err.Error())
		fmt.Printf("Failed to start server: %s", err.Error())
	}

	//defer rep.Close()

}
