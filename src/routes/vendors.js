const express = require('express');
const { getVendors, searchByName, getVendorSales,getVendorProductSales,getVendorName } = require('../controllers/vendorsController');

const router = express.Router();

router.get('/', getVendors); 
router.post('/search', searchByName);
router.post('/sales', getVendorSales);
router.post('/product-sales', getVendorProductSales);
module.exports = router;
