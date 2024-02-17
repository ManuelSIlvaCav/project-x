package router

import "go.uber.org/fx"

var Modules = fx.Options(fx.Invoke(BindRoutes), fx.Provide(NewRouter))
