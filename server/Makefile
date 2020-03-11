include .env

.PHONY: dev
dev:
	docker-compose up -d

.PHONY: up
up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f
