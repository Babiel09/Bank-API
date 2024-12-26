# Bank API

This repository contains an API designed to simulate various banking actions, including:

- **Money Transfers**: Transfer funds between accounts.
- **Deposits**: Add money to an account.
- **Withdrawals**: Take money out of an account.

The API also includes a robust authentication system using JWT (JSON Web Tokens) and a login feature to manage user sessions securely.

## Features

- **Banking Operations**: Perform transactions like deposits, withdrawals, and money transfers.
- **User Authentication**: Secure login system with JWT for authentication and session management.
- **Database Integration**: Leverages a database for storing user and transaction data.

## Technologies Used
### Node.js
<img src="https://skillicons.dev/icons?i=nodejs" /><br/>
### Nest.js
<img src="https://skillicons.dev/icons?i=nestjs" /><br/>
### JWT
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-NViQHfwad5ZxH5vhGu89h3YT52SQpDnjg&s" width=55/><br/>
### Typescript
<img src="https://skillicons.dev/icons?i=typescript" /><br/>
### Prisma
<img src="https://skillicons.dev/icons?i=prisma" /><br/>
### Postgres
<img src="https://skillicons.dev/icons?i=postgres" /><br/>
### Redis
<img src="https://skillicons.dev/icons?i=redis" /><br/>
### BullMQ
<img src="https://repository-images.githubusercontent.com/162494199/a1d3ba61-e0f0-4916-a376-53002605da83"  width=66/><br/>

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Babiel09/Bank-API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Bank-API/src
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=4857
     JWT_SECRET=your_jwt_secret
     DB_URL=your_database_uri 
     ```

5. Start the server:
   ```bash
   npm start
   ```

6. The API will be available at `http://localhost:4857`.

## Endpoints

### Banking Endpoints
- `POST /transfer/v1/deposit`: Deposit money into an account.
- `POST /transfer/v1/withdraw`: Withdraw money from an account.
- `POST /transfer/v1/transfer`: Transfer money to another account.

- ### User Endpoints
- `GET /user/v1`: Get all users.
- `GET /user/v1/search`: Search from one user in the DB.
- `GET /user/v1/:id `: Get one specified user for the id.
- `GET /user/v3/login `: Try to made the user login.
- `POST /user/v1 `: Post a new user.
- `PUT /user/v1/:id `: Updated a user with the specified id.
- `DELETE /user/v2/:id `: Delte one user with a specified id.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.
