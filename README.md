# EduConnect Platform (formerly AWS Education Web Platform)

This is the frontend application for the EduConnect education and connection platform.

## Setup Environment Variables

Before running the application, you need to set up the required environment variables:

1. Create a `.env` file in the root directory of the project
2. Copy the contents from `.env.example` to your `.env` file
3. Fill in your AWS Cognito and DynamoDB configuration values:

```
VITE_AWS_REGION=your-aws-region
VITE_AWS_USER_POOL_ID=your-user-pool-id
VITE_AWS_USER_POOL_CLIENT_ID=your-user-pool-client-id
VITE_AWS_ACCESS_KEY_ID=your-aws-access-key
VITE_AWS_SECRET_ACCESS_KEY=your-aws-secret-key
VITE_DYNAMODB_USER_TABLE=Users
VITE_DYNAMODB_MESSAGE_TABLE=Messages
```

## Setting Up DynamoDB Tables

The application requires two DynamoDB tables:

### 1. Users Table

Create a table with the following settings:
- **Table Name**: `Users` (or the value from `VITE_DYNAMODB_USER_TABLE`)
- **Partition Key**: `email` (String)
- **Sort Key**: none

### 2. Messages Table

Create a table with the following settings:
- **Table Name**: `Messages` (or the value from `VITE_DYNAMODB_MESSAGE_TABLE`)
- **Partition Key**: `conversationId` (String)
- **Sort Key**: `messageId` (String)

## Getting Started

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Features

- **Authentication**: User registration, login, password reset
- **Profile Management**: View and edit user profile
- **User Search**: Find other students and teachers
- **Messaging**: Real-time chat between users
- **Dashboard**: Overview of activities and information

## Technologies Used

- React (with Vite)
- AWS Cognito for authentication
- AWS DynamoDB for data storage
- Tailwind CSS for styling

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
