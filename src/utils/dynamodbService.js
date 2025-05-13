// DynamoDB service for handling user data
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  GetCommand, 
  UpdateCommand,
  QueryCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

// Create document client (to work with JavaScript objects)
const docClient = DynamoDBDocumentClient.from(client);

// Table name for users
const USER_TABLE_NAME = import.meta.env.VITE_DYNAMODB_USER_TABLE || 'Users';

/**
 * Save user data to DynamoDB after successful registration
 * @param {string} userId - The user's ID (Cognito sub)
 * @param {object} userData - User data to save
 */
export const saveUserToDynamoDB = async (userId, userData) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      Item: {
        userId, // Partition key
        email: userData.email,
        fullName: userData.name,
        birthdate: userData.birthdate,
        gender: userData.gender,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profileCompleted: false,
        preferences: {},
        // Additional fields can be added as needed
      }
    };

    await docClient.send(new PutCommand(params));
    // console.log('User data saved to DynamoDB');
    return true;
  } catch (error) {
    console.error('Error saving user to DynamoDB:', error);
    throw error;
  }
};

/**
 * Get user data from DynamoDB
 * @param {string} userId - The user's ID (Cognito sub)
 */
export const getUserFromDynamoDB = async (userId) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      Key: {
        userId
      }
    };

    const { Item } = await docClient.send(new GetCommand(params));
    return Item;
  } catch (error) {
    console.error('Error getting user from DynamoDB:', error);
    throw error;
  }
};

/**
 * Update user data in DynamoDB
 * @param {string} userId - The user's ID (Cognito sub)
 * @param {object} updateData - Data to update
 */
export const updateUserInDynamoDB = async (userId, updateData) => {
  try {
    // Create expression attribute names and values
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    let updateExpression = 'SET ';

    // Always update the updatedAt field
    updateData.updatedAt = new Date().toISOString();

    // Build the update expression
    Object.keys(updateData).forEach((key, index) => {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = updateData[key];
      
      updateExpression += `${index !== 0 ? ', ' : ''}${attributeName} = ${attributeValue}`;
    });

    const params = {
      TableName: USER_TABLE_NAME,
      Key: {
        userId
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return Attributes;
  } catch (error) {
    console.error('Error updating user in DynamoDB:', error);
    throw error;
  }
};

/**
 * Query users by email
 * @param {string} email - User's email to search for
 */
export const queryUserByEmail = async (email) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      IndexName: 'EmailIndex', // Assuming you have a GSI on email field
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    };

    const { Items } = await docClient.send(new QueryCommand(params));
    return Items.length > 0 ? Items[0] : null;
  } catch (error) {
    console.error('Error querying user by email from DynamoDB:', error);
    throw error;
  }
};

/**
 * List all users from DynamoDB - for admin functionality
 * @param {number} limit - Maximum number of users to return
 * @param {string} lastEvaluatedKey - Last evaluated key for pagination
 * @returns {Promise<{users: Array, lastEvaluatedKey: Object}>} - Users and last evaluated key for pagination
 */
export const listAllUsers = async (limit = 20, lastEvaluatedKey = null) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      Limit: limit
    };

    // Add LastEvaluatedKey for pagination if provided
    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const { Items, LastEvaluatedKey } = await docClient.send(new ScanCommand(params));
    
    return {
      users: Items,
      lastEvaluatedKey: LastEvaluatedKey
    };
  } catch (error) {
    console.error('Error listing users from DynamoDB:', error);
    throw error;
  }
};
