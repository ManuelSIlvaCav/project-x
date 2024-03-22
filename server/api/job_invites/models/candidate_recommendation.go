package job_invites_models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	CandidateRecommendationInput struct {
		ID          string              `json:"id,omitempty"`
		CandidateID *primitive.ObjectID `json:"candidate_id" validate:"required"`
		JobID       *primitive.ObjectID `json:"job_id" validate:"required"`
		CompanyID   *primitive.ObjectID `json:"company_id" validate:"required"`
		UserID      *primitive.ObjectID `json:"user_id"`
	}

	CandidateRecommendationFilter struct {
		CompanyID string `json:"company_id"`
		JobID     string `json:"job_id"`
	}

	CandidateRecommendation struct {
		ID                 string              `json:"id,omitempty" bson:"_id,omitempty"`
		CompanyID          *primitive.ObjectID `json:"company_id" bson:"companyId" validate:"required"`
		CandidateProfileID *primitive.ObjectID `json:"candidate_profile_id" bson:"candidateProfileId" validate:"required"`
		JobListingID       *primitive.ObjectID `json:"job_listing_id" bson:"jobListingId" validate:"required"`
		RecommendedBy      *primitive.ObjectID `json:"recommended_by" bson:"recommendedBy" validate:"required"`
		Origin             string              `json:"origin" bson:"origin" validate:"required"`
		CreatedAt          time.Time           `json:"createdAt" bson:"createdAt,omitempty"`
	}
)
