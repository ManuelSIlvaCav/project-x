# Setup

!Important we need to update env variables for the usage of this repo

> export OPENAI_API_KEY="..."

# Working Locally

## Run the local environment

> source env/bin/activate

## Install dependencies on requirements.txt

> pip install -r requirements.txt

## Save the new dependencies that get install

> pip freeze > requirements.txt

## Run the server in the local env

> uvicorn app.main:app --reload

## Deactivate local environment

> deactivate

# Docker

## Build image and run it

> docker build -t myimage .

> docker run -d --name mycontainer -p 80:80 myimage

# Ref.

- https://seeai.hashnode.dev/transforming-unstructured-documents-to-standardized-formats-with-gpt-building-a-resume-parser

- Migrate to use a single OPEN Ai interface to access new models
- https://platform.openai.com/docs/guides/text-generation/completions-api
