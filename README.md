# project-x

## With docker-compose

> docker-compose build
> docker-compose up

Implementation for Docker images ref: https://christiangiacomi.com/posts/multi-stage-docker-image-go/

# Terraform

Important to setup env variables

> export AWS_ACCESS_KEY_ID=""
> export AWS_SECRET_ACCESS_KEY=""

- https://spacelift.io/blog/terraform-ecs
- https://nexgeneerz.io/aws-computing-with-ecs-ec2-terraform/
- https://nexgeneerz.io/how-to-setup-amazon-ecs-fargate-terraform/

# Infracost

> infracost breakdown --path .

## Migrations

https://medium.com/pengenpaham/postgres-database-migration-using-golang-migrate-docker-compose-and-makefile-159ef50670cf

## TODO

1. Build a single deployment of golang api on app runner

- https://medium.com/@kumarapkvel/step-by-step-guide-to-host-a-simple-rest-api-in-aws-docker-aws-app-runner-6adcda4f144a

2. Build mongo cluster and connect it to

- App Runer
- Terraform ECS

3. Make a github actions pipeline that works with terraform architecture

- Check out if on new image the ecs clusters update

# Features

1. Finish Login Flow

- Call Login from login Web

2. Candidate mock

- BUild a form to gather information
  - Upload CV
  - Work experiences with skills
  - Education
  - Links
  - Questions
