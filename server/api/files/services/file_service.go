package files_services

type FileService interface {
	UploadFile() (string, error)
}
