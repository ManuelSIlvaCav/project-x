package emails

import (
	emails_handlers "server/api/emails/handlers"
	email_repository "server/api/emails/repository"
	interfaces "server/api/interfaces"
	"server/container"
	"server/router"
)

type EmailsModule struct {
	emailTemplateRepository email_repository.EmailTemplateRepository
}

func NewEmailsModule(container *container.Container, router *router.Router) *EmailsModule {
	emailTemplateRepository := email_repository.NewEmailRepository(container)

	emailsModule := &EmailsModule{emailTemplateRepository: emailTemplateRepository}

	routes := []interfaces.Route{}

	routes = append(routes,
		router.BuildRoute("POST", "", emails_handlers.CreateEmailTemplate(container, emailTemplateRepository)),
	)

	router.SetRoutes("/email_templates", routes)

	return emailsModule
}
