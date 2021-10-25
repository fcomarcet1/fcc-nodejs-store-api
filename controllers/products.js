('use strict');

/**
 * Get static products list
 */
const getProductsStatic = async (req, res) => {
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
