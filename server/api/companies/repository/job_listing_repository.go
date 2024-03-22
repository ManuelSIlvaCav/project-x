package companies_repository

import (
	"context"
	companies_models "server/api/companies/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	JobListingRepository interface {
		CreateJobListing(companyId string, jobListing companies_models.JobListing) (string, error)
		GetJobListingsByCompanyID(companyID string, prevCursor string, limit int) ([]companies_models.JobListing, error)
	}
	jobListingRepository struct {
		container  *container.Container
		collection *mongo.Collection
	}
)

func NewJobListingRepository(container *container.Container) *jobListingRepository {
	collection := container.GetMongoDB().GetCollection("job_listings")
	return &jobListingRepository{container: container, collection: collection}
}

func (repo *jobListingRepository) CreateJobListing(companyId string, jobListing companies_models.JobListing) (string, error) {
	//We create the job listing
	jobListingResult, err := repo.collection.InsertOne(context.TODO(), jobListing)
	if err != nil {
		return "", err
	}

	return jobListingResult.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (repo *jobListingRepository) GetJobListingsByCompanyID(companyID string, prevCursor string, limit int) ([]companies_models.JobListing, error) {
	logger := repo.container.GetLogger()
	//We get the job listings by company ID
	var jobListings []companies_models.JobListing

	companyObjectId, companyErrorId := primitive.ObjectIDFromHex(companyID)

	if companyErrorId != nil {
		return nil, companyErrorId
	}

	filter := bson.D{{Key: "companyId", Value: companyObjectId}}

	if prevCursor != "" {
		cursorID, err := primitive.ObjectIDFromHex(prevCursor)
		if err != nil {
			return nil, err
		}
		filter = append(filter, bson.E{Key: "_id", Value: bson.D{{Key: "$gt", Value: cursorID}}})
	}

	opts := &options.FindOptions{}
	if limit > 0 {
		opts.SetLimit(int64(limit))
	}

	logger.Info("Logging filter", "filter", filter)

	cursor, err := repo.collection.Find(context.TODO(), filter, opts)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(context.Background())

	errParsing := cursor.All(context.Background(), &jobListings)
	if errParsing != nil {
		return nil, errParsing
	}

	logger.Info("logging results", "Result: ", jobListings)

	return jobListings, nil
}
