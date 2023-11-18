package container

import (
	"server/config"
	"server/logger"
)

type Container interface {
	GetConfig() *config.Config
	GetLogger() logger.Logger
}

type container struct {
	config *config.Config
	env    string
	logger logger.Logger
}

func NewContainer(config *config.Config, env string, logger logger.Logger) Container {
	return &container{config: config, env: env, logger: logger}
}

func (c *container) GetConfig() *config.Config {
	return c.config
}

func (c *container) GetLogger() logger.Logger {
	return c.logger
}
