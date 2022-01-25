import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const creds = {
  accessKeyId: process.env.DYNAMODB_ID,
  secretAccessKey: process.env.DYNAMODB_KEY,
};

const ddbClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: creds,
});

export { ddbClient };
