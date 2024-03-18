package email_repository

import (
	"context"
	emails_model "server/api/emails/models"
	"server/container"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EmailTemplateRepository interface {
	SaveEmailTemplate(emailTemplate emails_model.EmailTemplate) (string, error)
	//GetEmailTemplateById(id string) (emails_model.EmailTemplate, error)
	//GetEmailTemplates(filters interface{}) ([]emails_model.EmailTemplate, error)
}

type emailTemplateRepository struct {
	container *container.Container
}

func NewEmailRepository(container *container.Container) *emailTemplateRepository {
	return &emailTemplateRepository{container: container}
}

func (repo *emailTemplateRepository) SaveEmailTemplate(emailTemplate emails_model.EmailTemplate) (string, error) {
	ctx := context.Background()
	filesCollection := (repo.container.GetMongoDB()).GetCollection("email_templates")

	result, err := filesCollection.InsertOne(ctx, emailTemplate)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}
