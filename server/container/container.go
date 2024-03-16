package container

import (
	"server/container/utils/config"
	"server/container/utils/custom_validator"
	"server/container/utils/db/mongo"
	"server/container/utils/db/postgres"
	"server/container/utils/logger"
)

type Container struct {
	env             string
	logger          logger.Logger
	config          config.Config
	mongoDB         mongo.MongoDB
	postgres        postgres.PostgresSQL
	customValidator custom_validator.CustomValidator
	//validator *validator.Validate
}

func NewContainer() *Container {
	configInstance := config.NewConfig()
	loggerInstance := logger.InitLogger(*configInstance)
	mongoDBInstance := mongo.NewMongoDB(*configInstance, loggerInstance)
	//postgresDBInstance := postgres.NewPostgresSQL(*configInstance, loggerInstance)
	customValidator := custom_validator.NewCustomValidator()

	return &Container{config: *configInstance, env: configInstance.Env, logger: loggerInstance, mongoDB: mongoDBInstance, customValidator: customValidator}
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

func (c *Container) GetCustomValidator() custom_validator.CustomValidator {
	return c.customValidator
}

func (c *Container) GetPostgres() postgres.PostgresSQL {
	return c.postgres
}
