package postgres

import (
	"database/sql"
	"fmt"
	"server/container/utils/config"
	"server/container/utils/logger"

	_ "github.com/lib/pq"
)

type PostgresSQL interface {
	GetDB() *sql.DB
}

type postgresSQL struct {
	db *sql.DB
}

func NewPostgresSQL(config config.Config, logger logger.Logger) *postgresSQL {
	db := Init(config, logger)

	postgres := &postgresSQL{
		db: db,
	}

	return postgres
}

func Init(config config.Config, logger logger.Logger) *sql.DB {

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Postgres.Host, config.Postgres.Port, config.Postgres.User, config.Postgres.Password, config.Postgres.Database)

	logger.Info("Connecting to postgres the database", "psqlInfo", psqlInfo)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to postgres!")

	return db

}

func (db *postgresSQL) GetDB() *sql.DB {
	return db.db
}
