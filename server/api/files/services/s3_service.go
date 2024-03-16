package files_services

import (
	"io"
	"server/container"
	"server/container/utils/config"

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
	logger := container.GetLogger()
	config := container.GetConfig()

	logger.Info("Creating new S3 session", "region", config.AWS.Region, "accessKeyId", config.AWS.AccessKeyId, "secretKeyId", config.AWS.SecretKeyId)

	s3Session := getNewSession(config)

	return &s3Service{
		container:  container,
		s3Session:  s3Session,
		mainBucket: "project-x-eu-1"}
}

func getNewSession(config config.Config) *session.Session {
	region := config.AWS.Region
	awsAccessKey := config.AWS.AccessKeyId
	awsSecretKey := config.AWS.SecretKeyId

	s3Session := session.Must(
		session.NewSession(&aws.Config{
			Region: aws.String(region),
			Credentials: credentials.NewStaticCredentials(
				awsAccessKey,
				awsSecretKey,
				""),
		}))

	return s3Session

}

// UploadFile uploads a file to S3
func (s *s3Service) UploadFile(fileName string, body io.Reader) (string, error) {
	logger := s.container.GetLogger()
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
		logger.Error("Failed to upload file", err)
		return "", err
	}

	//We need to save the file into collection for future Reference
	logger.Info("File uploaded successfully", "result", result)

	return result.Location, nil

}
