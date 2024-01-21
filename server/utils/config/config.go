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
		MongoUri string `yaml:"mongo_uri" default:"mongodb://localhost:27017"`
	}
	Port string `yaml:"port" default:"3000"`
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

	//Print what is in env file
	fmt.Printf("Env file: %s\n", *env)

	data, err := yamlFile.ReadFile(fmt.Sprintf(AppConfigPath, *env))
	if err != nil {
		fmt.Printf("Failed to read application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}

	//Print what is in env file
	fmt.Printf("Env file: %s\n", string(data))

	replaced := os.ExpandEnv(string(data))

	config := &Config{}
	if err := yaml.Unmarshal([]byte(replaced), config); err != nil {
		fmt.Printf("Failed to unmarshall application.%s.yml: %s", *env, err)
		os.Exit(ErrExitStatus)
	}
	fmt.Printf("Loaded application %+v\n", config)
	return config, *env
}
