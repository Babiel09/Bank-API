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

- **Node.js**: Backend runtime.
- **Express.js**: Web application framework.
- **JWT**: For secure user authentication.
- **TypeScript**: Ensures type safety and better code quality.
- **MongoDB** *(optional)*: Example database for storing user and transaction data.

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
     PORT=3000
     JWT_SECRET=your_jwt_secret
     DB_URI=your_database_uri # If using MongoDB
     ```

5. Start the server:
   ```bash
   npm start
   ```

6. The API will be available at `http://localhost:3000`.

## Endpoints

### Authentication
- `POST /auth/login`: Log in to the system and receive a JWT.
- `POST /auth/register`: Register a new user.

### Banking Operations
- `POST /transactions/deposit`: Deposit money into an account.
- `POST /transactions/withdraw`: Withdraw money from an account.
- `POST /transactions/transfer`: Transfer money to another account.

## Folder Structure

The repository is organized as follows:

- **src**: Contains the main application code.
  - **controllers**: Handles the business logic for each feature.
  - **routes**: Defines API endpoints.
  - **models**: Database schemas and models.
  - **middleware**: Custom middleware like authentication.
  - **utils**: Utility functions and helpers.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Start building your banking applications with this API today! 🚀
