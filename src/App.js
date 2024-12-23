const express = require('express');
const connectDB = require('./config/db');
const vendorsRoutes = require('./routes/vendors'); 
const ordersRoutes = require('./routes/orders');  

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

connectDB()
  .then((db) => {
    app.locals.db = db;
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

  
app.use('/api/vendors', vendorsRoutes);
app.use('/api/orders', ordersRoutes);

module.exports = app;
