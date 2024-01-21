package mongo

import (
	"context"
	"fmt"
	"server/utils/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB interface {
	GetClient() *mongo.Client
}

type mongoDB struct {
	db *mongo.Client
}

func Init(config config.Config) (*mongo.Client, error) {
	ctx := context.Background()

	fmt.Printf("Connecting to %s\n", config.MongoDB.MongoUri)

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.MongoDB.MongoUri))

	if err != nil {
		return nil, err
	}

	// Check the connection
	if err = client.Ping(context.TODO(), nil); err != nil {
		return nil, err
	}

	fmt.Println("Connected to MongoDB")
	return client, nil
}

func LoadMongo(config config.Config) *mongoDB {
	client, _ := Init(config)

	db := &mongoDB{
		db: client,
	}

	return db
}

func (db *mongoDB) GetClient() *mongo.Client {
	return db.db
}
