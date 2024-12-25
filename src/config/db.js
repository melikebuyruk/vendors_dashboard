require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = 'vendor_graph';

async function connectDB() {
  if (!uri) {
    throw new Error("MONGO_URI undefined.");
  }

  const client = new MongoClient(uri); 

  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1); 
  }
}

module.exports = connectDB;
