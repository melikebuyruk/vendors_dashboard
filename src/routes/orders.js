const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/vendor_graph";
const dbName = "vendor_graph";

router.get('/', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const orders = await db.collection('orders').find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
});

router.post('/seed', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);


    const result = await db.collection('orders').insertMany(sampleOrders);
    res.status(201).json({ message: "Sample orders inserted", result });
  } catch (error) {
    console.error("Error seeding orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
