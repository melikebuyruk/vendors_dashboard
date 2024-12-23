const express = require('express');
const vendorsRoutes = require('./vendors');
const ordersRoutes = require('./orders');

const router = express.Router();

router.use('/vendors', vendorsRoutes); 
router.use('/orders', ordersRoutes); 

module.exports = router;
