const { ObjectId } = require('mongodb');

async function getVendors(req, res) {
  try {
    const db = req.app.locals.db;
    if (!db) throw new Error("Database connection error");

    const vendors = await db.collection('vendors').find({}).toArray();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function searchByName(req, res) {
  try {
    const db = req.app.locals.db;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name parameter is required" });

    const vendors = await db.collection('vendors').find({ name: { $regex: name, $options: 'i' } }).toArray();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error searching vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getVendorSales(req, res) {
  try {
    const db = req.app.locals.db;
    const { vendorId } = req.body;

    if (!db) return res.status(500).json({ error: "Database connection error" });
    if (!ObjectId.isValid(vendorId)) return res.status(400).json({ error: "Invalid Vendor ID" });

    const vendorObjectId = new ObjectId(vendorId);
    const products = await db.collection('parent_products').find({ vendor: vendorObjectId }).toArray();

    if (products.length === 0) return res.status(200).json([]);

    const productIds = products.map(product => product._id);

    const salesData = await db.collection('orders').aggregate([
      { $unwind: "$cart_item" },
      { $match: { "cart_item.product": { $in: productIds } } },
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$payment_at" } },
            month: { $month: { $toDate: "$payment_at" } }
          },
          totalSales: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.cogs"] } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]).toArray();

    if (salesData.length === 0) return res.status(200).json([]);

    const formattedData = salesData.map(data => ({
      month: `${data._id.year}-${String(data._id.month).padStart(2, '0')}`,
      totalSales: data.totalSales
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching vendor sales:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getVendorProductSales(req, res) {
  try {
    const db = req.app.locals.db;
    const { vendorId } = req.body;

    if (!db) return res.status(500).json({ error: "Database connection error" });
    if (!ObjectId.isValid(vendorId)) return res.status(400).json({ error: "Invalid Vendor ID" });

    const vendorObjectId = new ObjectId(vendorId);
    const products = await db.collection('parent_products').find({ vendor: vendorObjectId }).toArray();

    if (products.length === 0) return res.status(200).json([]);

    const productMap = products.reduce((acc, product) => {
      acc[product._id.toString()] = product.name;
      return acc;
    }, {});

    const productIds = products.map(product => product._id);

    const productSalesData = await db.collection('orders').aggregate([
      { $unwind: "$cart_item" },
      { $match: { "cart_item.product": { $in: productIds } } },
      {
        $group: {
          _id: "$cart_item.product",
          totalQuantity: { $sum: "$cart_item.quantity" },
          totalSales: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.cogs"] } }
        }
      },
      { $sort: { totalSales: -1 } }
    ]).toArray();

    if (productSalesData.length === 0) return res.status(200).json([]);

    const formattedData = productSalesData.map(data => ({
      productId: data._id,
      productName: productMap[data._id.toString()],
      totalQuantity: data.totalQuantity,
      totalSales: data.totalSales
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching vendor product sales:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  getVendors,
  searchByName,
  getVendorSales,
  getVendorProductSales,
};
