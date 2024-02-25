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
	MongoDB struct {
		MongoUri     string `yaml:"mongo_uri" default:"mongodb://localhost:27017"`
		MainDatabase string `yaml:"database_name" default:"project-x"`
	}
	Port string `yaml:"port" default:"3000"`
	Env  string
	AWS  struct {
		Region      string `yaml:"region" default:"us-east-1"`
		AccessKeyId string `yaml:"access_key"`
		SecretKeyId string `yaml:"secret_key"`
	}
}

const (
	DEV    = "dev"
	PROD   = "prod"
	DOCKER = "docker"
)

//go:embed resources/config/application.*.yml
var yamlFile embed.FS

func NewConfig() *Config {
	config := loadAppConfig(yamlFile)
	return config
}

func loadAppConfig(yamlFile embed.FS) *Config {
	var env *string

	if value := os.Getenv("ENV"); value != "" {
		env = &value
	} else {
		env = flag.String("env", DEV, "Environment")
		flag.Parse()
	}

	data, err := yamlFile.ReadFile(fmt.Sprintf(AppConfigPath, *env))
	if err != nil {
		fmt.Printf("Failed to read application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}

	replaced := os.ExpandEnv(string(data))

	config := &Config{}
	if err := yaml.Unmarshal([]byte(replaced), config); err != nil {
		fmt.Printf("Failed to unmarshall application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}
	config.Env = *env
	fmt.Printf("Loaded application %+v\n", config)
	return config
}
