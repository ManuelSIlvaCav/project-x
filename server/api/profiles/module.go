package profiles

import (
	"server/api/files"
	interfaces "server/api/interfaces"
	profiles_handlers "server/api/profiles/handlers"
	profiles_repository "server/api/profiles/repository"
	"server/container"
	"server/router"
)

type ProfilesModule struct {
	userProfilesRepository profiles_repository.UserProfilesRepository
}

func NewProfilesModule(container *container.Container, router *router.Router, filesModule *files.FilesModule) *ProfilesModule {
	userProfilesRepository := profiles_repository.NewUserProfilesRepository(container)

	profilesModule := &ProfilesModule{
		userProfilesRepository: userProfilesRepository,
	}

	routes := []interfaces.Route{}
	routes = append(routes,
		router.BuildRoute("POST", "/upload-cv", profiles_handlers.UploadCV(container, filesModule, userProfilesRepository)),
		router.BuildRoute("PUT", "/:profile_id/work-experience", profiles_handlers.UpdateWorkExperience(container, userProfilesRepository)),
		router.BuildRoute("PUT", "/:profile_id/education", profiles_handlers.UpdateEducation(container, userProfilesRepository)),
		router.BuildRoute("GET", "/:profile_id", profiles_handlers.GetProfile(container, userProfilesRepository)),
		router.BuildRoute("DELETE", "/:profile_id/work-experience/:work_experience_id", profiles_handlers.DeleteWorkExperience(container, userProfilesRepository)),
	)

	router.SetRoutes("/profiles", routes)

	return profilesModule
}

// Get user profiles repository
func (module *ProfilesModule) GetUserProfilesRepository() profiles_repository.UserProfilesRepository {
	return module.userProfilesRepository
}
