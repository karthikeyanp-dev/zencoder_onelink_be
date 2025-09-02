# OneLink Backend

OneLink is a mobile-first bookmark management application that enables users to organize, curate, and share collections of links with rich visual previews and seamless social sharing capabilities.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Docker and Docker Compose (for local development with PostgreSQL)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd onelink_be
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following content:

```
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=onelink
DB_SYNCHRONIZE=true
DB_LOGGING=true

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d
```

### 4. Start the database

```bash
docker-compose up -d
```

This will start PostgreSQL and pgAdmin containers. You can access pgAdmin at http://localhost:5050 with the following credentials:
- Email: admin@onelink.com
- Password: admin

### 5. Run the application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 6. Seed the database (optional)

```bash
npm run seed
```

This will create a test user with the following credentials:
- Email: test@example.com
- Username: testuser
- Password: password123

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Delete user account

### Collections

- `GET /api/collections` - Get all collections for current user
- `GET /api/collections/:id` - Get a specific collection
- `POST /api/collections` - Create a new collection
- `PUT /api/collections/:id` - Update a collection
- `DELETE /api/collections/:id` - Delete a collection

### Links

- `GET /api/links/collection/:collectionId` - Get all links in a collection
- `GET /api/links/:id` - Get a specific link
- `POST /api/links` - Create a new link
- `PUT /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link
- `PUT /api/links/collection/:collectionId/positions` - Update link positions

### Sharing

- `GET /api/sharing/shares` - Get all shares for current user
- `GET /api/sharing/collection/:collectionId/shares` - Get all shares for a collection
- `POST /api/sharing/share` - Share a collection with another user
- `DELETE /api/sharing/share/:id` - Remove a share
- `GET /api/sharing/collection/:collectionId/public-links` - Get all public links for a collection
- `POST /api/sharing/public-link` - Create a public link for a collection
- `DELETE /api/sharing/public-link/:id` - Remove a public link

## Docker

To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t onelink-backend .

# Run the container
docker run -p 3000:3000 --env-file .env onelink-backend
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```