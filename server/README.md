# Project architecture

- We use a module type architecture were we export services and repositories as needed to be injected on other modules

# For logging purposes we use Zap with it's opinionated config. More info on

- https://betterstack.com/community/guides/logging/go/zap/

# For Dependency injection we use uber library

- https://uber-go.github.io/fx/get-started/

## Execute single container

> docker build -f Dockerfile -t server-go .

> docker run -dp 127.0.0.1:3000:3000 server-go -d

## Running without container

sh start.sh

# ToDo

- Emails Module
  - Create template
  - Connect to amazon SNS
- Files Module
  - Connect with S3 to upload the CV
- Implement candidates list and filters for easy search (maybe explore elasticsearch)
