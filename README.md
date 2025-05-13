# AWS Education Web Platform

This is the frontend application for the AWS Education Platform.

## Setup Environment Variables

Before running the application, you need to set up the required environment variables:

1. Create a `.env` file in the root directory of the project
2. Copy the contents from `.env.example` to your `.env` file
3. Fill in your AWS Cognito configuration values:

```
VITE_AWS_REGION=your-aws-region
VITE_AWS_USER_POOL_ID=your-user-pool-id
VITE_AWS_USER_POOL_CLIENT_ID=your-user-pool-client-id
```

## Getting Started

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
