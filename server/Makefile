include .env

.PHONY: dev
dev:
	docker-compose up -d

.PHONY: up
up:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

.PHONY: db
db:
	docker-compose -f docker-compose.db.yml up -d

.PHONY: dev-f
dev-f:
	docker-compose up -d --force-recreate --remove-orphans --build

.PHONY: up-f
up-f:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --remove-orphans --build

.PHONY: db-f
db-f:
	docker-compose -f docker-compose.db.yml up -d --force-recreate --remove-orphans --build

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f
