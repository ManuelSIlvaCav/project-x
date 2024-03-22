package repository

import (
	"context"
	job_invites_models "server/api/job_invites/models"
	"server/container"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	CandidateRecommendationRepository interface {
		CreateCandidateRecommendation(candidateRecommendation job_invites_models.CandidateRecommendationInput) (string, error)

		GetCandidateRecommendations(filter *job_invites_models.CandidateRecommendationFilter, prevCursor string, limit int) ([]job_invites_models.CandidateRecommendation, error)
	}
	candidateRecommendationRepository struct {
		container  *container.Container
		collection *mongo.Collection
	}
)

func NewCandidateRecommendationRepository(container *container.Container) *candidateRecommendationRepository {
	collection := container.GetMongoDB().GetCollection("candidate_recommendations")
	return &candidateRecommendationRepository{container: container, collection: collection}
}

func (repo *candidateRecommendationRepository) CreateCandidateRecommendation(candidateRecommendation job_invites_models.CandidateRecommendationInput) (string, error) {
	//Convert to CandidateRecommendation struct
	candidateRecommendationStruct := job_invites_models.CandidateRecommendation{
		CompanyID:          candidateRecommendation.CompanyID,
		CandidateProfileID: candidateRecommendation.CandidateID,
		JobListingID:       candidateRecommendation.JobID,
		RecommendedBy:      candidateRecommendation.UserID,
		Origin:             "manual",
		CreatedAt:          time.Now(),
	}

	//We create the candidate recommendation
	candidateRecommendationResult, err := repo.collection.InsertOne(context.TODO(), candidateRecommendationStruct)
	if err != nil {
		return "", err
	}

	return candidateRecommendationResult.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (repo *candidateRecommendationRepository) GetCandidateRecommendations(filter *job_invites_models.CandidateRecommendationFilter, prevCursor string, limit int) ([]job_invites_models.CandidateRecommendation, error) {
	logger := repo.container.GetLogger()

	findAllFilter := bson.D{}

	if filter.CompanyID != "" {
		objectCompanyId, _ := primitive.ObjectIDFromHex(filter.CompanyID)
		findAllFilter = append(findAllFilter, bson.E{Key: "companyId", Value: objectCompanyId})
	}

	if filter.JobID != "" {
		objectJobId, _ := primitive.ObjectIDFromHex(filter.JobID)
		findAllFilter = append(findAllFilter, bson.E{Key: "jobListingId", Value: objectJobId})

	}

	if prevCursor != "" {
		cursorID, err := primitive.ObjectIDFromHex(prevCursor)
		if err != nil {
			return nil, err
		}
		findAllFilter = append(findAllFilter, bson.E{Key: "_id", Value: bson.D{{Key: "$gt", Value: cursorID}}})
	}

	opts := &options.FindOptions{}

	if limit > 0 {
		opts.SetLimit(int64(limit))
	}

	logger.Info("Getting candidate recommendations", "filter", findAllFilter)
	cursor, err := repo.collection.Find(context.Background(), findAllFilter, opts)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(context.Background())

	var candidateRecommendations []job_invites_models.CandidateRecommendation

	errParsing := cursor.All(context.Background(), &candidateRecommendations)

	logger.Info("Candidate recommendations", "candidateRecommendations", candidateRecommendations)

	if errParsing != nil {

		return nil, errParsing
	}

	return candidateRecommendations, nil
}
