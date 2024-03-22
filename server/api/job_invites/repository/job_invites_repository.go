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
	JobInvitesRepository interface {
		GetJobInvitesByJobID(jobID string) ([]job_invites_models.JobInvite, error)
		CreateJobInvite(jobInvite job_invites_models.JobInviteInput) (string, error)
	}
	jobInviteRepository struct {
		container  *container.Container
		collection *mongo.Collection
	}
)

func NewJobInvitesRepository(container *container.Container) JobInvitesRepository {
	collection := container.GetMongoDB().GetCollection("job_invites")
	return &jobInviteRepository{container: container, collection: collection}
}

func (repo *jobInviteRepository) GetJobInvitesByJobID(jobID string) ([]job_invites_models.JobInvite, error) {
	logger := repo.container.GetLogger()

	//We get the job invites by job ID

	jobObjectId, jobErrorId := primitive.ObjectIDFromHex(jobID)

	if jobErrorId != nil {
		return nil, jobErrorId
	}

	filter := bson.D{{Key: "jobId", Value: jobObjectId}}

	opts := &options.FindOptions{}

	cursor, err := repo.collection.Find(context.TODO(), filter, opts)
	if err != nil {
		return nil, err
	}

	defer cursor.Close(context.Background())

	var jobInvites []job_invites_models.JobInvite

	errParsing := cursor.All(context.Background(), &jobInvites)
	if errParsing != nil {
		return nil, errParsing
	}

	logger.Info("logging results", "Result: ", jobInvites)

	return jobInvites, nil
}

func (repo *jobInviteRepository) CreateJobInvite(jobInvite job_invites_models.JobInviteInput) (string, error) {
	logger := repo.container.GetLogger()

	jobId, _ := primitive.ObjectIDFromHex(jobInvite.JobID)
	candidateId, _ := primitive.ObjectIDFromHex(jobInvite.CandidateID)
	companyId, _ := primitive.ObjectIDFromHex(jobInvite.CompanyID)
	//Delete the ID from the input

	newJobInvite := &job_invites_models.JobInvite{
		JobID:       &jobId,
		CandidateID: &candidateId,
		CompanyID:   &companyId,
		Status:      "pending",
		CreatedAt:   time.Now(),
	}

	insertResult, err := repo.collection.InsertOne(context.Background(), newJobInvite)

	if err != nil {
		return "", err
	}

	logger.Info("logging results create job invite", "Result: ", insertResult)

	return insertResult.InsertedID.(primitive.ObjectID).Hex(), nil
}
