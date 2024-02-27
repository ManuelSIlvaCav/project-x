package container

import (
	"server/container/utils/config"
	"server/container/utils/db/mongo"
	"server/container/utils/logger"

	"github.com/go-playground/validator/v10"
)

type Container struct {
	env       string
	logger    logger.Logger
	config    config.Config
	mongoDB   mongo.MongoDB
	validator *validator.Validate
}

func NewContainer() *Container {
	configInstance := config.NewConfig()
	loggerInstance := logger.InitLogger(*configInstance)
	mongoDBInstance := mongo.NewMongoDB(*configInstance, loggerInstance)
	validator := validator.New()
	return &Container{config: *configInstance, env: configInstance.Env, logger: loggerInstance, mongoDB: mongoDBInstance, validator: validator}
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

func (c *Container) GetValidator() *validator.Validate {
	return c.validator
}
