COMPOSE_FILE := docker-compose.yml
PROJECT_NAME := books-app

.DEFAULT_GOAL := help

build:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) build

up:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) up -d

down:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down

logs:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) logs -f

frontend:
	@docker exec -it $(PROJECT_NAME)_frontend sh

backend:
	@docker exec -it $(PROJECT_NAME)_backend sh

db:
	@docker exec -it $(PROJECT_NAME)_db psql -U postgres -d mydatabase

clean:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down -v

status:
	@docker compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) ps

run_frontend:
	cd frontend && npm run dev

run_backend:
	cd backend && npm run start:dev

help:
	@echo "Usage: make <target>"
	@echo
	@echo "Targets:"
	@echo "  build           Build all Docker containers."
	@echo "  up              Build and start all services."
	@echo "  down            Stop all running services."
	@echo "  logs            Tail logs from all services."
	@echo "  frontend        Access the frontend container."
	@echo "  backend         Access the backend container."
	@echo "  db              Access the database container."
	@echo "  clean           Stop and remove all services, including volumes."
	@echo "  status          Check the status of all services."
	@echo "  run_frontend    Run the frontend in development mode."
	@echo "  run_backend     Run the backend in development mode."
