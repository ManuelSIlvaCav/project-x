export ENV=dev
export PORT=3000
export MONGO_DB=project-x
export MONGO_URI=mongodb://localhost:27017/$MONGO_DB

go build .
go run server