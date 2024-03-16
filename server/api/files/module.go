package files

import (
	files_repository "server/api/files/repository"
	files_services "server/api/files/services"
	"server/container"
	"server/router"
)

type FilesModule struct {
	FileService     files_services.FileService
	FilesRepository files_repository.FilesRepository
}

func NewFilesModule(container *container.Container, router *router.Router) *FilesModule {
	s3Service := files_services.NewS3Service(container)
	return &FilesModule{
		FileService:     s3Service,
		FilesRepository: files_repository.NewFilesRepository(container),
	}
}
