export ENV=dev
export PORT=3000
export MONGO_DB=project-x
export MONGO_URI=mongodb://localhost:27017/$MONGO_DB

# For AWS acess
export AWS_ACCESS_KEY_ID=AKIASCR6YF5QWJHUIPUO
export AWS_SECRET_ACCESS_KEY=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
export AWS_REGION=eu-west-2

go build .
go run server