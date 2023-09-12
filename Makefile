export DOCKER_COMPOSE=docker-compose

run: ## Launch docker-compose stack
	$(DOCKER_COMPOSE) up --remove-orphans -d

install: ## Install all dependencies
	$(DOCKER_COMPOSE) build

stop: ## Stop the Docker containers
	$(DOCKER_COMPOSE) stop

down: ## Delete the Docker containers and volumes
	$(DOCKER_COMPOSE) down -v

logs: ## Log the Docker containers
	$(DOCKER_COMPOSE) logs --tail=10 -f

clean: ## Delete generated folders
	rm -rf backend/vendor
	rm -rf backend/var
	rm -rf frontend/node_modules

ps: ## Show running containers
	$(DOCKER_COMPOSE) ps