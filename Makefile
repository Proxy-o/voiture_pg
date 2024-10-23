# Makefile for managing the Next.js and Prisma project

.PHONY: all setup build dev seed studio refresh start lint

# Default target
all: setup

# Setup the environment
setup: db-push db-generate seed

# Build the Next.js application
build:
	npm run build

# Start development server
dev:
	npm run dev

# Seed the database
seed:
	npm run db:seed

# Open Prisma Studio
studio:
	npm run db:studio

# Refresh the database (reset and migrate)
refresh:
	npm run db:refresh

# Start the Next.js application
start:
	npm run start

# Lint the code
lint:
	npm run lint

# Custom target to generate Prisma client
db-generate:
	npm run postinstall

# Custom target for pushing the database schema
db-push:
	npm run db:push
