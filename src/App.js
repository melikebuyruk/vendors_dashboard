const express = require('express');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRoutes);

module.exports = app;
