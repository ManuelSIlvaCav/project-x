package logger

import (
	"context"
	"embed"
	"fmt"
	"os"
	"time"

	"server/config"

	"go.uber.org/zap"
	"gopkg.in/natefinch/lumberjack.v2"
	"gopkg.in/yaml.v3"
)

const (
	logTitle      = "[logger] "
	sqlFormat     = logTitle + "%s"
	messageFormat = logTitle + "%s, %s"
	errorFormat   = logTitle + "%s, %s, %s"
	slowThreshold = 200
)

// Config represents the setting for zap logger.
type Config struct {
	ZapConfig zap.Config        `json:"zap_config" yaml:"zap_config"`
	LogRotate lumberjack.Logger `json:"log_rotate" yaml:"log_rotate"`
}

// Logger is an alternative implementation of *gorm.Logger
type Logger interface {
	GetZapLogger() *zap.SugaredLogger
	Info(ctx context.Context, msg string, data ...interface{})
	Warn(ctx context.Context, msg string, data ...interface{})
	Error(ctx context.Context, msg string, data ...interface{})
	Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error)
}

type logger struct {
	Zap *zap.SugaredLogger
}

// Error implements Logger.
func (log *logger) Error(ctx context.Context, msg string, data ...interface{}) {
	log.Zap.Errorf(messageFormat, append([]interface{}{msg}, data...)...)
}

// Info implements Logger.
func (log *logger) Info(ctx context.Context, msg string, data ...interface{}) {
	log.Zap.Infof(messageFormat, append([]interface{}{msg}, data...)...)
}

// Trace implements Logger.
func (log *logger) Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error) {
	log.Zap.Infof(messageFormat)
}

// Warn implements Logger.
func (log *logger) Warn(ctx context.Context, msg string, data ...interface{}) {
	log.Zap.Warnf(messageFormat, append([]interface{}{msg}, data...)...)
}

// NewLogger is constructor for logger
func NewLogger(sugar *zap.SugaredLogger) Logger {
	return &logger{Zap: sugar}
}

// InitLogger create logger object for *gorm.DB from *echo.Logger
func InitLogger(env string, yamlFile embed.FS) Logger {
	configYaml, err := yamlFile.ReadFile(fmt.Sprintf(config.LoggerConfigPath, env))
	if err != nil {
		fmt.Printf("Failed to read logger configuration: %s", err)
		os.Exit(config.ErrExitStatus)
	}
	var myConfig *Config
	if err = yaml.Unmarshal(configYaml, &myConfig); err != nil {
		fmt.Printf("Failed to read zap logger configuration: %s", err)
		os.Exit(config.ErrExitStatus)
	}
	var zap *zap.Logger
	zap, err = build(myConfig)
	if err != nil {
		fmt.Printf("Failed to compose zap logger : %s", err)
		os.Exit(config.ErrExitStatus)
	}
	sugar := zap.Sugar()
	// set package varriable logger.
	log := NewLogger(sugar)
	log.GetZapLogger().Infof("Success to read zap logger configuration: zaplogger." + env + ".yml")
	_ = zap.Sync()
	return log
}

// GetZapLogger returns zapSugaredLogger
func (log *logger) GetZapLogger() *zap.SugaredLogger {
	return log.Zap
}
