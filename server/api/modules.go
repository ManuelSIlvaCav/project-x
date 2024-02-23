package api

import (
	"server/api/auth"
	"server/api/files"
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
)
