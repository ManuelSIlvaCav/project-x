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

Build a github action for a full pipeline with the architecture in terraform

1. Build a simple deployment of server in GO to be consumed with app runner

- https://medium.com/@kumarapkvel/step-by-step-guide-to-host-a-simple-rest-api-in-aws-docker-aws-app-runner-6adcda4f144a

2. Build a Files module for handling File uploads and interact with AWS S3

3. Users/Auth API

- Register
- Login
-

4. Files API

- Upload File
- Download File

5. Build a Python Docker image Flask

a. Build a python api that handles the parsing of a CV with the

- /parse

  - Template
  - File

- https://seeai.hashnode.dev/transforming-unstructured-documents-to-standardized-formats-with-gpt-building-a-resume-parser
- https://python.langchain.com/docs/expression_language/cookbook/prompt_llm_parser
