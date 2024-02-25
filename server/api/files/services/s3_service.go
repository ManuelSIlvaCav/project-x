package files_services

import (
	"io"
	"server/container"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

type (
	s3Service struct {
		container  *container.Container
		s3Session  *session.Session
		mainBucket string
	}
)

// NewS3Service creates a new S3 service
func NewS3Service(container *container.Container) *s3Service {
	s3Session := getNewSession(container)

	return &s3Service{container: container, s3Session: s3Session, mainBucket: "venand-images"}
}

func getNewSession(container *container.Container) *session.Session {

	config := container.GetConfig()

	region := config.AWS.Region

	logger := container.GetLogger()

	logger.Info("Creating new S3 session", "region", region, "accessKeyId", config.AWS.AccessKeyId, "secretKeyId", config.AWS.SecretKeyId)

	s3Session := session.Must(session.NewSession(&aws.Config{
		Region:      aws.String(region),
		Credentials: credentials.NewStaticCredentials(config.AWS.AccessKeyId, config.AWS.SecretKeyId, ""),
	}))

	return s3Session

}

// UploadFile uploads a file to S3
func (s *s3Service) UploadFile(fileName string, body io.Reader) (string, error) {

	uploader := s3manager.NewUploader(s.s3Session, func(u *s3manager.Uploader) {
		// Define a strategy that will buffer 25 MiB in memory
		u.BufferProvider = s3manager.NewBufferedReadSeekerWriteToPool(25 * 1024 * 1024)
	})

	result, err := uploader.Upload(&s3manager.UploadInput{

		Bucket: aws.String(s.mainBucket),
		Key:    aws.String(fileName),
		Body:   body,
	})

	if err != nil {
		s.container.GetLogger().Error("Failed to upload file", err)
		return "", err
	}

	return result.Location, nil

}
