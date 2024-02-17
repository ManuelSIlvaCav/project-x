export ENV=dev
export PORT=3000
export MONGO_URI=mongodb://localhost:27017/project-x

go build .
go run server