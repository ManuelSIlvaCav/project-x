package config

import (
	"embed"
	"flag"
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Extension struct {
		CorsEnabled bool `yaml:"cors_enabled" default:"false"`
	}
	Log struct {
		RequestLogFormat string `yaml:"request_log_format" default:"${remote_ip} ${account_name} ${uri} ${method} ${status}"`
	}
}

const (
	DEV    = "dev"
	PROD   = "prod"
	DOCKER = "docker"
)

func LoadAppConfig(yamlFile embed.FS) (*Config, string) {
	var env *string

	if value := os.Getenv("ENV"); value != "" {
		env = &value
	} else {
		env = flag.String("env", DEV, "Environment")
		flag.Parse()
	}
	file, err := yamlFile.ReadFile(fmt.Sprintf(AppConfigPath, *env))
	if err != nil {
		fmt.Printf("Failed to read application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}

	config := &Config{}
	if err := yaml.Unmarshal(file, config); err != nil {
		fmt.Printf("Failed to unmarshall application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}
	return config, *env
}
