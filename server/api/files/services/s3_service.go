package files_services

import "server/container"

type (
	s3Service struct {
		container *container.Container
	}
)

// NewS3Service creates a new S3 service
func NewS3Service(container *container.Container) *s3Service {
	return &s3Service{container: container}
}

// UploadFile uploads a file to S3
func (s *s3Service) UploadFile() (string, error) {
	return "", nil
}
