package container

import (
	"server/utils/config"
	"server/utils/db/mongo"
	"server/utils/logger"
)

type Container interface {
	GetConfig() *config.Config
	GetLogger() logger.Logger
	GetMongoDB() mongo.MongoDB
}

type container struct {
	env     string
	logger  logger.Logger
	config  *config.Config
	mongoDB mongo.MongoDB
}

func NewContainer(config *config.Config, env string, logger logger.Logger, mongodb mongo.MongoDB) Container {
	return &container{config: config, env: env, logger: logger, mongoDB: mongodb}
}

func (c *container) GetConfig() *config.Config {
	return c.config
}

func (c *container) GetLogger() logger.Logger {
	return c.logger
}

func (c *container) GetMongoDB() mongo.MongoDB {
	return c.mongoDB
}
