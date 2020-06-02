include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: db
db:
	docker-compose -f docker-compose.db.yml up -d

.PHONY: up-f
up-f:
	docker-compose up -d --force-recreate --remove-orphans --build

.PHONY: db-f
db-f:
	docker-compose -f docker-compose.db.yml up -d --force-recreate --remove-orphans --build

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f
