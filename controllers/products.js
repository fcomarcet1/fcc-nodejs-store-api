('use strict');
const Product = require('../models/Product');


/**
 * Get static products list
 */
const getProductsStatic = async (req, res) => {

    const products = await Product.find({});

    /**
     *  ********* express-async-errors(module) ***************
     * test express-async-errors(module) for catch mongoose error
     * and not need try{}catch(err){} in every mongoose query
     */
    //throw new Error('⛔⛔⛔ Testing express-async-errors(module) ⛔⛔⛔')

    res.status(200).json({
        message: 'Get static products list'
    });
}


/**
 * Get products list
 */
 const getProducts = async (req, res) => {
    res.status(200).json({
        message: 'Get products list'
    });
}


module.exports = {
    getProductsStatic,
    getProducts
}
