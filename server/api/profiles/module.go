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
		router.BuildRoute("PUT", "/:user_id/work-experience", profiles_handlers.UpdateWorkExperience(container, userProfilesRepository)),
		router.BuildRoute("GET", "/:user_id", profiles_handlers.GetProfile(container, userProfilesRepository)),
	)

	router.SetRoutes("/profiles", routes)

	return profilesModule
}

// Get user profiles repository
func (module *ProfilesModule) GetUserProfilesRepository() profiles_repository.UserProfilesRepository {
	return module.userProfilesRepository
}
