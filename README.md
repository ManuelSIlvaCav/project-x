# misc-utils

## Execute single container

> docker build -f Dockerfile -t server-go .

> docker run -dp 127.0.0.1:3000:3000 server-go -d

## With docker-compose

> docker-compose build
> docker-compose up

Implementation for Docker images ref: https://christiangiacomi.com/posts/multi-stage-docker-image-go/

# Terraform

- https://spacelift.io/blog/terraform-ecs
- https://nexgeneerz.io/aws-computing-with-ecs-ec2-terraform/
- https://nexgeneerz.io/how-to-setup-amazon-ecs-fargate-terraform/

# Infracost

> infracost breakdown --path .

## Migrations

https://medium.com/pengenpaham/postgres-database-migration-using-golang-migrate-docker-compose-and-makefile-159ef50670cf

## TODO

1. Build user module with auth using JWT

2. Build a template for responses and decouple from echo So it is easier to change if we want to move out of echo. Modules are not responsible for handling echo types nor handlers

- Return the response on the handler functions
- Then foreach route you return with their handler, map it out in echo format echoHandler in there route.
