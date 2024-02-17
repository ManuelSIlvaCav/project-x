package mongo

import (
	"context"
	"fmt"
	"server/container/utils/config"
	"server/container/utils/logger"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB interface {
	GetClient() *mongo.Client
}

type mongoDB struct {
	db *mongo.Client
}

func Init(config config.Config, logger logger.Logger) (*mongo.Client, error) {
	ctx := context.Background()

	logger.Info(ctx, fmt.Sprintf("Connecting to %s\n", config.MongoDB.MongoUri))

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.MongoDB.MongoUri))

	if err != nil {
		return nil, err
	}

	logger.Info(ctx, "Sending Ping to mongo server", nil)
	// Check the connection
	if err = client.Ping(ctx, nil); err != nil {
		logger.Error(ctx, "Could not ping remote mongo server", err)
		return nil, err
	}

	fmt.Println("Connected to MongoDB")
	return client, nil
}

func NewMongoDB(config config.Config, logger logger.Logger) *mongoDB {
	client, _ := Init(config, logger)

	db := &mongoDB{
		db: client,
	}

	return db
}

func (db *mongoDB) GetClient() *mongo.Client {
	return db.db
}
