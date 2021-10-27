'use strict';

const express = require('express');
const router = express.Router();

const {getProductsStatic, getProducts} = require('../controllers/products');


// routes
router.route('/').get(getProducts);
router.route('/static').get(getProductsStatic);


module.exports = router;