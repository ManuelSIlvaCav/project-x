package mongo

import (
	"context"
	"crypto/tls"
	"fmt"
	"server/container/utils/config"
	"server/container/utils/logger"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB interface {
	GetClient() *mongo.Client
	GetCollection(collection string) *mongo.Collection
}

type mongoDB struct {
	db               *mongo.Client
	mainDatabaseName string
}

func Init(config config.Config, logger logger.Logger) (*mongo.Client, error) {
	ctx := context.Background()

	logger.Info(fmt.Sprintf("Connecting to %s\n", config.MongoDB.MongoUri))

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(config.MongoDB.MongoUri).SetServerAPIOptions(serverAPI)

	if config.IsProd() {
		opts.SetTLSConfig(&tls.Config{InsecureSkipVerify: true})
	}

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, opts)

	if err != nil {
		return nil, err
	}

	logger.Info("Sending Ping to mongo server")
	// Check the connection
	if err = client.Ping(ctx, nil); err != nil {
		logger.Error("Could not ping remote mongo server", "error", err)
		return nil, err
	}

	logger.Info("Connected to MongoDB!")
	return client, nil
}

func NewMongoDB(config config.Config, logger logger.Logger) *mongoDB {
	client, _ := Init(config, logger)

	db := &mongoDB{
		db:               client,
		mainDatabaseName: config.MongoDB.MainDatabase,
	}

	return db
}

func (db *mongoDB) GetClient() *mongo.Client {
	return db.db
}

func (db *mongoDB) GetCollection(collection string) *mongo.Collection {
	return db.db.Database(db.mainDatabaseName).Collection(collection)
}
