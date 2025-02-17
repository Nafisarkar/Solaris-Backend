# Solaris Backend

This is the backend for the Solaris application, built with Node.js, Express, and MongoDB. It provides APIs for user authentication, product management, and seeding the database with sample data.

## Table of Contents

- [Solaris Backend](#solaris-backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Product Routes](#product-routes)
    - [Seed Routes](#seed-routes)
  - [Environment Variables](#environment-variables)
  - [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/solaris-backend.git
    cd solaris-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/userDB
    JWT_KEY=supersecretkey
    SMTP_MAIL=your-email@gmail.com
    SMTP_KEY=your-smtp-key
    VARIFICATION_URL=http://localhost:3000
    COOKIE_SIGN_KEY=cookiesignsecretkey
    RATE_LIMITE=400
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

The backend server will be running at `http://localhost:3000`. You can use tools like Postman to test the API endpoints.

## API Endpoints

### User Routes

- `GET /api/user`: Get all users (admin only)
- `POST /api/user/signup`: Sign up a new user
- `GET /api/user/register`: Create a user in the database
- `POST /api/user/login`: Log in a user
- `DELETE /api/user/logout`: Log out a user
- `GET /api/user/:id`: Get a user by ID (admin only)
- `PUT /api/user/:id`: Update a user by ID (admin only)
- `DELETE /api/user/:id`: Delete a user by ID (admin only)

### Product Routes

- `GET /api/product`: Get all products
- `GET /api/product/cetagory/:catagoryname`: Get all products in a specific category
- `POST /api/product`: Add a new product
- `GET /api/product/:id`: Get a product by ID
- `PUT /api/product/:id`: Update a product by ID
- `DELETE /api/product/:id`: Delete a product by ID

### Seed Routes

- `POST /seed/user`: Seed the database with sample users
- `POST /seed/user/:id`: Seed the database with a specific number of sample users
- `POST /seed/product`: Seed the database with sample products

## Environment Variables

- [PORT](http://_vscodecontentref_/1): The port on which the server will run.
- [MONGO_URI](http://_vscodecontentref_/2): The URI for connecting to the MongoDB database.
- [JWT_KEY](http://_vscodecontentref_/3): The secret key for JWT token creation.
- [SMTP_MAIL](http://_vscodecontentref_/4): The email address used for sending emails.
- [SMTP_KEY](http://_vscodecontentref_/5): The SMTP key for the email address.
- [VARIFICATION_URL](http://_vscodecontentref_/6): The URL used for email verification.
- [COOKIE_SIGN_KEY](http://_vscodecontentref_/7): The secret key for signing cookies.
- `RATE_LIMITE`: The rate limit for API requests.

## License

This project is licensed under the MIT License.