package files

import (
	files_services "server/api/files/services"
	"server/container"
	"server/router"
)

type FilesModule struct {
	FileService files_services.FileService
}

func NewFilesModule(container *container.Container, router *router.Router) *FilesModule {
	s3Service := files_services.NewS3Service(container)
	return &FilesModule{
		FileService: s3Service,
	}
}
