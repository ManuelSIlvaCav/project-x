# misc-utils

## Execute single container

> docker build -f Dockerfile -t server-go .

> docker run -dp 127.0.0.1:3000:3000 server-go -d

## With docker-compose

> docker-compose build
> docker-compose up

Implementation for Docker images ref: https://christiangiacomi.com/posts/multi-stage-docker-image-go/

## Migrations

https://medium.com/pengenpaham/postgres-database-migration-using-golang-migrate-docker-compose-and-makefile-159ef50670cf

## TODO

1. Build user module with auth using JWT

1.a. Build terraform deployment for AWS https://spacelift.io/blog/terraform-ecs

2. Build a template for responses and decouple from echo So it is easier to change if we want to move out of echo. Modules are not responsible for handling echo types nor handlers

- Return the response on the handler functions
- Then foreach route you return with their handler, map it out in echo format echoHandler in there route.

3. Build a github pipeline with infracost for testing total costs of changes https://medium.com/nerd-for-tech/terraforming-the-cost-with-infracost-c28dc6c981c9
