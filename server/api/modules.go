package api

import (
	"server/api/auth"
	"server/api/companies"
	"server/api/emails"
	"server/api/files"
	"server/api/job_invites"
	"server/api/profiles"
	"server/api/users"

	"go.uber.org/fx"
)

var Modules = fx.Options(
	fx.Provide(NewAPI),
	fx.Provide(users.NewUserModule),
	fx.Provide(auth.NewAuthModule),
	fx.Provide(profiles.NewProfilesModule),
	fx.Provide(files.NewFilesModule),
	fx.Provide(emails.NewEmailsModule),
	fx.Provide(companies.NewCompanyModule),
	fx.Provide(job_invites.NewJobInvitesModule),
)
