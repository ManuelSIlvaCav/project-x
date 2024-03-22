package job_invites_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	JobInviteInput struct {
		ID          string `json:"id" validate:"omitempty"`
		JobID       string `json:"job_id" validate:"required"`
		CandidateID string `json:"candidate_id" validate:"required"`
		CompanyID   string `json:"company_id" validate:"required"`
	}

	JobInvite struct {
		ID          *primitive.ObjectID `json:"id" bson:"_id,omitempty"`
		JobID       *primitive.ObjectID `json:"job_id" bson:"jobId" validate:"required"`
		CandidateID *primitive.ObjectID `json:"candidate_id" bson:"candidateId" validate:"required"`
		CompanyID   *primitive.ObjectID `json:"company_id" bson:"companyId" validate:"required"`
		Status      string              `json:"status" bson:"status" validate:"required"`
		CreatedAt   time.Time           `json:"createdAt" bson:"createdAt,omitempty"`
	}
)
