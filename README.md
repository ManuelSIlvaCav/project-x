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

## If testing with app runner connecting to MongoDB

https://www.linkedin.com/pulse/cr%2525C3%2525A9er-une-connexion-s%2525C3%2525A9curis%2525C3%2525A9-entre-app-runner-et-mongo-jordan-kagmeni-dolxe/?trackingId=tgyBxZdgStiv3QWXFzsADg%3D%3D

## TODO

1. Make mongo compatible with app runner

2. Test out the terraform architecture
   2.a Make a github actions pipeline that works with terraform architecture

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
