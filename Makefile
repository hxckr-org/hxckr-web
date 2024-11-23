docker-build:
	docker build -f Dockerfile.dev -t jede-app .

docker-run:
	docker run --rm -p 3000:3000 --env-file .env.local jede-app