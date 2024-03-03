package profiles_repository

import (
	profiles_models "server/api/profiles/models"
	"server/container"
)

type WorkExperienceDraftRepository interface {
}

// We can refactor this to be a draft for many types instead of just work experience
type workExperienceDraftRepository struct {
	container *container.Container
}

func NewWorkExperienceDraftRepository(container *container.Container) *workExperienceDraftRepository {
	return &workExperienceDraftRepository{container}
}

// This functions creates a draft working experience for a user
// This is a previous step before creating the actual work experience in the user profile
func (repo *workExperienceDraftRepository) CreateWorkExperienceDraft(userId string, workExperienceId string, workExperience profiles_models.WorkExperience) (string, error) {
	return "", nil
}
