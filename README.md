# project-x

## Execute single container

> docker build -f Dockerfile -t server-go .

> docker run -dp 127.0.0.1:3000:3000 server-go -d

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

Build a github action for a full pipeline with the architecture in terraform

1. Build a single deployment of golang api on app runner

- Deployment of golang image on ECR (custom)

- https://medium.com/@kumarapkvel/step-by-step-guide-to-host-a-simple-rest-api-in-aws-docker-aws-app-runner-6adcda4f144a

  1.2 Configure S3 Credentials for files upload

2. Finish Login Flow

- Call Login from login Web

3. Candidate mock

- BUild a form to gather information
  - Upload CV
  - Work experiences with skills
  - Education
  - Links
  - Questions

4. Make a github actions pipeline that works with terraform architecture
5. Create a Read/Write only to S3 for public access on the Env file
