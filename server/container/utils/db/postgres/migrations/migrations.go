package postgres_migrations

import (
	"log"
	"server/container"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

func Migrate(container *container.Container) {
	driver, err := postgres.WithInstance(container.GetPostgres().GetDB(), &postgres.Config{})

	if err != nil {
		log.Println(err)
	}

	dbName := container.GetConfig().Postgres.Database

	m, err := migrate.NewWithDatabaseInstance(
		"file://./migrations/",
		dbName, driver)

	if err != nil {
		log.Println(err)
	}

	if err := m.Steps(2); err != nil {
		log.Println(err)
	}
}
