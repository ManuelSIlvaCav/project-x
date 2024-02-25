package files_services

import "io"

type FileService interface {
	UploadFile(fileName string, body io.Reader) (string, error)
}
