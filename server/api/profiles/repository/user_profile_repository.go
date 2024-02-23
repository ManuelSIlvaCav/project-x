package profiles_repository

import "server/container"

type UserProfilesRepository interface {
	// SaveProfile saves a profile in the DB
	SaveUserProfile() (string, error)
	// GetProfile gets a profile from the DB
	GetUserProfile() (string, error)
}

type userProfilesRepository struct{}

func NewUserProfilesRepository(container *container.Container) *userProfilesRepository {
	return &userProfilesRepository{}
}

func (u *userProfilesRepository) SaveUserProfile() (string, error) {
	return "SaveUserProfile", nil
}

func (u *userProfilesRepository) GetUserProfile() (string, error) {
	return "GetUserProfile", nil
}
