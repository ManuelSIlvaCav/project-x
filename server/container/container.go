package container

import (
	"server/container/utils/config"
	"server/container/utils/db/mongo"
	"server/container/utils/logger"
)

type Container struct {
	env     string
	logger  logger.Logger
	config  config.Config
	mongoDB mongo.MongoDB
}

func NewContainer() *Container {
	configInstance := config.NewConfig()
	loggerInstance := logger.InitLogger(*configInstance)
	mongoDBInstance := mongo.NewMongoDB(*configInstance, loggerInstance)
	return &Container{config: *configInstance, env: configInstance.Env, logger: loggerInstance, mongoDB: mongoDBInstance}
}

func (c *Container) GetConfig() config.Config {
	return c.config
}

func (c *Container) GetLogger() logger.Logger {
	return c.logger
}

func (c *Container) GetMongoDB() mongo.MongoDB {
	return c.mongoDB
}
