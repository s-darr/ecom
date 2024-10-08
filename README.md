# E-Com Store Backend

This repo contains a backend for an e-commerce store built with Node.js, Express, and PostgreSQL. It handles authentication, product management, cart functionality, processing orders.

## Features

- User registration (seller or buyer) and login
- Product management (for sellers)
- Cart functionality (for buyers)
- Purchase orders from cart

## Technologies Used

- **Node.js** and **Express** for server-side logic
- **PostgreSQL** as the database
- **Docker** for containerization (optional)
- **JWT** for authentication
- **bcrypt** for password hashing

## Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (local or containerized)
- **Docker** (optional, for containerization)

## Setup Instructions

1. **Clone the Repository**:

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/ecom_store
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**:

   - Create a PostgreSQL database and run the schema provided in `schema.sql` to set up the tables.
   - Alternatively, if Docker is set up, run:

   ```bash
   docker-compose up
   ```

5. **Run the Server**:
   ```bash
   npm start
   ```

## API

The API endpoints are available for users, sellers, products, and orders.

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login and get a JWT token.

### Products

- **POST /api/products/add**: Add a new product (seller only).

### Cart

- **POST /api/cart/add**: Add an item to the cart.
- **GET /api/cart**: Get items in the user's cart.
- **PUT /api/cart/update**: Update quantity of an item in the cart.
- **DELETE /api/cart/remove**: Remove an item from the cart.

### Orders

- **POST /api/orders/buy**: Buy items from the user's cart.

## Database Schema

Here are the the main tables used:

- Users
- Sellers
- Products
- Cart
- Orders
- OrderDetails

For the full schema, see the [`schema.sql`](schema.sql) file.

## Running in Docker (Optional)

You can set up the backend with Docker for easy deployment.

- **Dockerfile**: Defines the container image.
- **docker-compose.yml**: To set up both the app and PostgreSQL in a container environment.
- **To build and run the container**:
  ```bash
  docker-compose up --build
  ```

## To-do

Features for improvement.

- Add functionality for reviews table.
- Data caching using Redis to cache frequently accessed data.
- Optimise SQL queries, and implement rate limiting.
