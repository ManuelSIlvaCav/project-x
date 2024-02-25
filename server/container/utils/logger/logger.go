package logger

import (
	"context"
	"embed"
	"fmt"
	"os"
	"server/container/utils/config"
	"time"

	"go.uber.org/zap"
	"gopkg.in/natefinch/lumberjack.v2"
	"gopkg.in/yaml.v3"
)

const (
	logTitle      = "[project-x] "
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
	Panic(ctx context.Context, msg string, data ...interface{})
	Info(msg string, data ...interface{})
	Warn(msg string, data ...interface{})
	Error(msg string, data ...interface{})
	Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error)
}

type logger struct {
	Zap *zap.SugaredLogger
}

// Info implements Logger.
func (log *logger) Info(msg string, data ...interface{}) {
	log.Zap.Infow(msg, append([]interface{}{}, data...)...)
}

// Warn implements Logger.
func (log *logger) Warn(msg string, data ...interface{}) {
	log.Zap.Warnw(msg, append([]interface{}{}, data...)...)
}

// Error implements Logger.
func (log *logger) Error(msg string, data ...interface{}) {
	log.Zap.Errorw(msg, append([]interface{}{}, data...)...)
}

func (log *logger) Panic(ctx context.Context, msg string, data ...interface{}) {
	log.Zap.Panicf(msg, append([]interface{}{msg}, data...)...)
}

// Trace implements Logger.
func (log *logger) Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error) {
	log.Zap.Infof(messageFormat)
}

// NewLogger is constructor for logger
func NewLogger(sugar *zap.SugaredLogger) Logger {
	return &logger{Zap: sugar}
}

// InitLogger create logger object for *gorm.DB from *echo.Logger

//go:embed resources/zaplogger.*.yml
var zapYamlFile embed.FS

func InitLogger(configObj config.Config) Logger {

	configYaml, err := zapYamlFile.ReadFile(fmt.Sprintf(config.LoggerConfigPath, configObj.Env))

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
	zap, err = build(myConfig, configObj)
	if err != nil {
		fmt.Printf("Failed to compose zap logger : %s", err)
		os.Exit(config.ErrExitStatus)
	}

	sugar := zap.Sugar()
	// set package varriable logger.
	log := NewLogger(sugar)
	log.GetZapLogger().Infow("Success to read zap logger configuration: zaplogger." + configObj.Env + ".yml")
	_ = zap.Sync()
	return log
}

// GetZapLogger returns zapSugaredLogger
func (log *logger) GetZapLogger() *zap.SugaredLogger {
	return log.Zap
}
