FROM golang:1.21 as builder

ENV GO111MODULE=on

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build

FROM scratch

ENV ENV="docker"

COPY --from=builder /app/server /app/
EXPOSE 8080
ENTRYPOINT ["/app/server"]