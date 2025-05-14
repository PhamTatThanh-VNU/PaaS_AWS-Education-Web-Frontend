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

// Table names
const USER_TABLE_NAME = import.meta.env.VITE_DYNAMODB_USER_TABLE || 'Users';
const MESSAGE_TABLE_NAME = import.meta.env.VITE_DYNAMODB_MESSAGE_TABLE || 'Messages';

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
        email: userData.email, // Partition key
        userId: userId, // Secondary attribute
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
 * @param {string} email - The user's email (partition key)
 */
export const getUserFromDynamoDB = async (email) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      Key: {
        email
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
 * @param {string} email - The user's email (partition key)
 * @param {object} updateData - Data to update
 */
export const updateUserInDynamoDB = async (email, updateData) => {
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
        email
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
    // Since email is now the partition key, we can use GetCommand instead of QueryCommand
    const params = {
      TableName: USER_TABLE_NAME,
      Key: {
        email
      }
    };

    const { Item } = await docClient.send(new GetCommand(params));
    return Item;
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

/**
 * Search users by partial email match
 * @param {string} emailPrefix - Email prefix to search for
 * @param {number} limit - Maximum number of users to return
 * @returns {Promise<Array>} - Matching users
 */
export const searchUsersByEmail = async (emailPrefix, limit = 10) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      FilterExpression: "begins_with(email, :prefix)",
      ExpressionAttributeValues: {
        ":prefix": emailPrefix
      },
      Limit: limit
    };

    const { Items } = await docClient.send(new ScanCommand(params));
    return Items;
  } catch (error) {
    console.error('Error searching users by email prefix:', error);
    throw error;
  }
};

/**
 * Get user by email (direct lookup)
 * @param {string} email - User's email
 * @returns {Promise<Object>} - User object if found
 */
export const getUserByEmail = async (email) => {
  try {
    const params = {
      TableName: USER_TABLE_NAME,
      Key: {
        email: email
      }
    };

    const response = await docClient.send(new GetCommand(params));
    return response.Item;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

/**
 * Search for users by name or email
 * @param {string} searchTerm - The search term to find in name or email
 * @returns {Promise<Array>} - Array of matching users
 */
export const searchUsers = async (searchTerm) => {
  try {
    const searchTermLower = searchTerm.toLowerCase();
    
    // Using scan operation to search across all users
    const params = {
      TableName: USER_TABLE_NAME,
      FilterExpression: 'contains(#email, :searchTerm) OR contains(#fullName, :searchTerm)',
      ExpressionAttributeNames: {
        '#email': 'email',
        '#fullName': 'fullName'
      },
      ExpressionAttributeValues: {
        ':searchTerm': searchTermLower
      }
    };

    const response = await docClient.send(new ScanCommand(params));
    return response.Items || [];
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

/**
 * Send a message between users
 * @param {Object} messageData - Message data object
 * @returns {Promise<Object>} - Created message
 */
export const sendMessage = async (messageData) => {
  try {
    // Create a conversation ID combining both users' emails (alphabetically sorted)
    const emails = [messageData.sender, messageData.recipient].sort();
    const conversationId = `${emails[0]}:${emails[1]}`;
    
    // Generate a unique ID for the message (using timestamp)
    const messageId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    const params = {
      TableName: MESSAGE_TABLE_NAME,
      Item: {
        conversationId: conversationId,
        messageId: messageId,
        sender: messageData.sender,
        recipient: messageData.recipient,
        content: messageData.content,
        timestamp: messageData.timestamp || new Date().toISOString(),
        read: false
      }
    };

    await docClient.send(new PutCommand(params));
    return params.Item;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Get conversation history between two users
 * @param {string} user1Email - First user's email
 * @param {string} user2Email - Second user's email
 * @returns {Promise<Array>} - Array of messages
 */
export const getConversation = async (user1Email, user2Email) => {
  try {
    // Create a conversation ID combining both users' emails (alphabetically sorted)
    const emails = [user1Email, user2Email].sort();
    const conversationId = `${emails[0]}:${emails[1]}`;
    
    const params = {
      TableName: MESSAGE_TABLE_NAME,
      KeyConditionExpression: 'conversationId = :conversationId',
      ExpressionAttributeValues: {
        ':conversationId': conversationId
      },
      ScanIndexForward: true // Sort by messageId in ascending order (oldest first)
    };

    const response = await docClient.send(new QueryCommand(params));
    return response.Items || [];
  } catch (error) {
    console.error('Error getting conversation:', error);
    throw error;
  }
};

/**
 * Get recent conversations for a user
 * @param {string} userEmail - User's email
 * @returns {Promise<Array>} - Array of recent conversations
 */
export const getRecentConversations = async (userEmail) => {
  try {
    // First, scan for all messages where this user is sender or recipient
    const params = {
      TableName: MESSAGE_TABLE_NAME,
      FilterExpression: 'sender = :userEmail OR recipient = :userEmail',
      ExpressionAttributeValues: {
        ':userEmail': userEmail
      }
    };

    const response = await docClient.send(new ScanCommand(params));
    const messages = response.Items || [];

    // Group messages by conversation and find the most recent for each
    const conversationsMap = {};
    
    for (const message of messages) {
      // Determine who the other person in the conversation is
      const otherPersonEmail = message.sender === userEmail ? message.recipient : message.sender;
      
      // If this conversation hasn't been seen or this message is newer
      if (!conversationsMap[otherPersonEmail] || 
          new Date(message.timestamp) > new Date(conversationsMap[otherPersonEmail].timestamp)) {
        conversationsMap[otherPersonEmail] = {
          personEmail: otherPersonEmail,
          lastMessage: message.content,
          timestamp: message.timestamp,
          isFromUser: message.sender === userEmail
        };
      }
    }

    // Convert the map to an array and sort by timestamp (newest first)
    const conversations = Object.values(conversationsMap);
    conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Fetch user details for each conversation
    const enrichedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        try {
          const personData = await getUserByEmail(conversation.personEmail);
          return {
            ...conversation,
            personName: personData?.fullName || null
          };
        } catch (error) {
          console.error(`Error fetching user data for ${conversation.personEmail}:`, error);
          return conversation;
        }
      })
    );

    return enrichedConversations;
  } catch (error) {
    console.error('Error getting recent conversations:', error);
    throw error;
  }
};
