# DRDO HR Management System - DRDO Internship

## Overview
The HR Management System is a comprehensive application designed to streamline the process of managing employee information. This project involves creating a database using MySQL, building a React application for the front-end logic, and implementing a secure back-end system for data management and authentication.

## Features
- **Employee Management**: Add, update, delete, and view employee information.
- **Database Integration**: MySQL database for storing and retrieving employee records.
- **Secure Authentication**: Custom JWT tokenizer for secure user authentication.
- **Data Encryption**: Hash functions to ensure sensitive employee data is encrypted.
- **Router Implementation**: Dynamic routing for seamless navigation within the system.
- **RESTful APIs**: Axios for handling HTTP requests between the client and server.

## Tech Stack
- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Token (JWT)

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MySQL Server
- npm (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/RiyaSinghs/drdoHRmanagement.git
   ```

2. Navigate to the project directory:
   ```bash
   cd drdoHRmanagement
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the MySQL database:
   - Create a database named `hr_management`.
   - Execute the SQL scripts in the `database.sql` file to create tables.

5. Configure the `.env` file:
   - Add your MySQL credentials and JWT secret key.
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=hr_management
   JWT_SECRET=your_secret_key
   ```

6. Start the server:
   ```bash
   npm start
   ```

7. Start the React app:
   ```bash
   cd client
   npm start
   ```

## Usage
1. Open the application in your browser (default URL: `http://localhost:3000`).
2. Use the provided interface to manage employees:
   - Add new employees
   - View employee details
   - Edit existing employee records
   - Delete employees
3. Authenticate using the login system, secured by JWT.

## API Endpoints
- **Employee Management**:
  - `GET /api/employees`: Fetch all employees
  - `POST /api/employees`: Add a new employee
  - `PUT /api/employees/:id`: Update an existing employee
  - `DELETE /api/employees/:id`: Delete an employee
- **Authentication**:
  - `POST /api/login`: Authenticate user and receive a token

## Security Measures
- Employee data is encrypted using hash functions to protect sensitive information.
- Custom JWT tokens are used for secure authentication and session management.
![Screenshot 2024-12-28 185312](https://github.com/user-attachments/assets/4508f2f4-b647-4760-b183-c336023de5e9)
![Screenshot 2024-12-28 185728](https://github.com/user-attachments/assets/57b40bb8-a42b-4351-8ee8-ef89ea946d87)
![Screenshot 2024-12-28 185713](https://github.com/user-attachments/assets/3fe1bf9e-9d00-4ed2-982d-caaa1237c566)



