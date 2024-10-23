
# Company Management and Car Inventory System

> **Note:**  
> After seeding the database, the following users will be created so you can login:
> 
> - **Admin Account**  
>   Username: **admin**  
>   Password: **admin123**
> 
> - **User Account**  
>   Username: **user**  
>   Password: **user123**

This is an admin dashboard that allows the creation and management of companies, users, and car inventory. Users can log in to view the cars associated with their company, add new cars, manage clients, and generate invoices for clients.

## Features

- **Admin Dashboard**: Admins can create and manage companies and users.
- **User Authentication**: Users associated with a company can log in to access their company’s cars and clients.
- **Car Management**: Users can view, add, and update cars within their company's inventory.
- **Client Management**: Users can create and manage clients.
- **Invoice Generation**: Users can create invoices for clients based on car-related services or other transactions.

## Tech Stack

- **Next.js**: Frontend framework for building the user interface.
- **Prisma**: Database ORM for managing and interacting with the database.
- **Shadcn**: For UI components.
- **Lucia-auth**: Authentication system for handling user login and sessions.
- **Zod**: Validation library to ensure the integrity of user input.
- **React Hook Form**: For managing form inputs and validation.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- SQLite (or other Prisma-supported database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and configure the following:
   ```bash
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret"
   ```

4. Initialize the database and seed it with initial data:
   ```bash
   make setup
   ```

   > **IMPORTANT: Seeded User Accounts**
   > 
   > The following users will be created after running the seed:
   > 
   > - **Admin Account**  
   >   Username: **admin**  
   >   Password: **admin123**
   > 
   > - **User Account**  
   >   Username: **user**  
   >   Password: **user123**

5. Start the development server:
   ```bash
   make dev
   ```

### Scripts

You can use the `Makefile` to manage common project tasks:

- **Setup**: Initialize and seed the database
  ```bash
  make setup
  ```

- **Build**: Build the Next.js application
  ```bash
  make build
  ```

- **Development Server**: Start the app in development mode
  ```bash
  make dev
  ```

- **Seed Database**: Populate the database with seed data
  ```bash
  make seed
  ```

- **Prisma Studio**: Access the Prisma Studio to manage the database
  ```bash
  make studio
  ```

- **Database Refresh**: Reset and push the latest database schema
  ```bash
  make refresh
  ```

- **Start Production Server**: Start the application in production mode
  ```bash
  make start
  ```

- **Lint**: Run the linter to check for code issues
  ```bash
  make lint
  ```

### Authentication

The app uses **Lucia-auth** for managing user authentication. Users must log in to access the dashboard and manage company-specific data.

### Database

Prisma ORM is used for database management. The database schema includes models for:

- **Company**
- **User**
- **Car**
- **Client**
- **Invoice**

The project uses SQLite by default, but can be easily configured to use other databases supported by Prisma.

### Form Validation

All forms use **React Hook Form** along with **Zod** for input validation, ensuring data integrity and a smooth user experience.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

