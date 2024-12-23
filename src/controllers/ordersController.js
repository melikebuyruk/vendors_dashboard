async function getOrders(req, res) {
  try {
    const db = req.app.locals.db;
    if (!db) {
      throw new Error('Database connection error');
    }
    const orders = await db.collection('orders').find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getOrders };
