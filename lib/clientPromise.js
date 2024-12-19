import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to avoid creating multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, use a single connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
