package main

import (
	"embed"
	"fmt"
	"server/api"
	"server/container"
	"server/router"
	"server/utils/config"
	"server/utils/db/mongo"
	"server/utils/logger"

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

	//We need to create DB connection and pass it to container
	mongoDB := mongo.LoadMongo(*conf)

	container := container.NewContainer(conf, env, logger, mongoDB)

	//We pass the container to the api module
	api := api.LoadAPIModules(container)

	router.Init(e, container, api)

	if err := e.Start(fmt.Sprintf(":%s", conf.Port)); err != nil {
		//e.Logger.Fatal(err.Error())
		fmt.Printf("Failed to start server: %s", err.Error())
	}

	//defer rep.Close()

}
