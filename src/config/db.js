const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'vendor_graph';

async function connectDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db(dbName);
}

module.exports = connectDB;
