# Makefile for managing the Next.js and Prisma project 

# Colors for output
YELLOW := \033[1;33m
GREEN := \033[1;32m
RED := \033[1;31m
RESET := \033[0m

# Environment variables
ENV_EXAMPLE = .env.example
ENV_FILE = .env

.PHONY: all setup build dev seed studio refresh start lint install env db-generate db-push clean check-env

# Default target
all: check-env setup

# Setup the environment
setup: install env db-push db-generate seed
	@echo "$(GREEN)✓ Setup complete!$(RESET)"

# Install dependencies
install:
	@echo "$(YELLOW)Installing dependencies...$(RESET)"
	@if [ -f "package-lock.json" ]; then \
		npm ci; \
	else \
		npm install; \
	fi
	@echo "$(GREEN)✓ Dependencies installed$(RESET)"

# Setup environment file
env:
	@echo "$(YELLOW)Setting up environment file...$(RESET)"
	@if [ ! -f $(ENV_FILE) ]; then \
		if [ -f $(ENV_EXAMPLE) ]; then \
			cp $(ENV_EXAMPLE) $(ENV_FILE); \
			echo "$(GREEN)✓ Created $(ENV_FILE) from $(ENV_EXAMPLE)$(RESET)"; \
		else \
			echo "$(RED)Error: $(ENV_EXAMPLE) not found$(RESET)"; \
			exit 1; \
		fi \
	else \
		echo "$(YELLOW)⚠ $(ENV_FILE) already exists, skipping...$(RESET)"; \
	fi

# Check environment file exists
check-env:
	@if [ ! -f $(ENV_FILE) ] && [ ! -f $(ENV_EXAMPLE) ]; then \
		echo "$(RED)Error: Neither $(ENV_FILE) nor $(ENV_EXAMPLE) found$(RESET)"; \
		echo "$(YELLOW)Please create either $(ENV_FILE) or $(ENV_EXAMPLE) first$(RESET)"; \
		exit 1; \
	fi

# Build the Next.js application
build:
	@echo "$(YELLOW)Building Next.js application...$(RESET)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(RESET)"

# Start development server
dev:
	@echo "$(YELLOW)Starting development server...$(RESET)"
	npm run dev

# Seed the database
seed:
	@echo "$(YELLOW)Seeding database...$(RESET)"
	npm run db:seed
	@echo "$(GREEN)✓ Database seeded$(RESET)"

# Open Prisma Studio
studio:
	@echo "$(YELLOW)Opening Prisma Studio...$(RESET)"
	npm run db:studio

# Refresh the database (reset and migrate)
refresh:
	@echo "$(YELLOW)Refreshing database...$(RESET)"
	npm run db:refresh
	@echo "$(GREEN)✓ Database refreshed$(RESET)"

# Start the Next.js application
start:
	@echo "$(YELLOW)Starting Next.js application...$(RESET)"
	npm run start

# Lint the code
lint:
	@echo "$(YELLOW)Linting code...$(RESET)"
	npm run lint
	@echo "$(GREEN)✓ Linting complete$(RESET)"

# Custom target to generate Prisma client
db-generate:
	@echo "$(YELLOW)Generating Prisma client...$(RESET)"
	npm run postinstall
	@echo "$(GREEN)✓ Prisma client generated$(RESET)"

# Custom target for pushing the database schema
db-push:
	@echo "$(YELLOW)Pushing database schema...$(RESET)"
	npm run db:push
	@echo "$(GREEN)✓ Database schema pushed$(RESET)"

# Clean installed modules and env file
clean:
	@echo "$(YELLOW)Cleaning project...$(RESET)"
	@rm -rf node_modules
	@rm -f $(ENV_FILE)
	@echo "$(GREEN)✓ Project cleaned$(RESET)"

# Help command
help:
	@echo "Available commands:"
	@echo "  make          - Full setup (install, env, db-push, generate, seed)"
	@echo "  make install  - Install dependencies"
	@echo "  make env      - Setup environment file"
	@echo "  make setup    - Setup database and seed"
	@echo "  make build    - Build Next.js application"
	@echo "  make dev      - Start development server"
	@echo "  make seed     - Seed the database"
	@echo "  make studio   - Open Prisma Studio"
	@echo "  make refresh  - Refresh database"
	@echo "  make start    - Start Next.js application"
	@echo "  make lint     - Lint the code"
	@echo "  make clean    - Remove node_modules and env file"
