('use strict');
const Product = require('../models/Product');


/**
 * Get static products list 
 * in this case we pass static field for find
 */
const getProductsStatic = async (req, res) => {

    /* const products = await Product.find({ price: { $gt: 30 } })
        .sort('price')
        .select('name price'); */
   
    const products = await Product.find({company: 'ikea'});
    if(products.length === 0){
        res.status(200).json({
            message: 'No items',
            data: products
        });
    }
    if (!products) {
        /**
         * ********* express-async-errors(module) ***************
         * test express-async-errors(module) for catch mongoose error
         * and not need try{}catch(err){} in every mongoose query
         */
        //throw new Error('⛔⛔⛔ Testing express-async-errors(module) ⛔⛔⛔');
        throw Error("Something was wrong while find products list. Try again");
    }

    res.status(200).json({
        message: 'Get static products list',
        nbHits: products.length,
        data: products
    });
}


/**
 * Get products list with dynamic filter
 * /api/v1/products?name=pepe
 * {{URL}}/products?name=albany%20table&featured=false&page=3
 * with this method we can get other params(not included in Schema) ->page for example
 */
 const getProducts = async (req, res) => {
    
    //const products = await Product.find(req.query);

    //posibles values for filter search in query params
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {};

    //api/v1/products?featured=true
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    //* *********** test queryObject ****************
    // {{URL}}/products?featured=false&page=2
    console.log(queryObject); // { featured: false } --> return only list of featured=false
    //* param not defined in Product Schema
    // {{URL}}/products?page=2
    console.log(queryObject); // {} --> return all list

    // company in Schema is type: String and enum
    // enum: { values: ['ikea', 'liddy', 'caressa', 'marcos']}
    //api/v1/products?featured=false&company='ikea'
    if (company) {
        queryObject.company = company;
    }
    //* *********** test queryObject *********** 
    // {{URL}}/products?featured=false&company=ikea&page=3
    console.log(queryObject); // { featured: false, company: 'ikea' }

    // {{URL}}/products?featured=false&company=ikea&page=3
    console.log(queryObject)// { featured: false, company: 'ikea' }

    const products = await Product.find(queryObject);
    
    // match exactly name
    /**
     * To use in mongoDB $regex, use one of the following syntaxes:
        { <field>: { $regex: /pattern/, $options: '<options>' } }
        { <field>: { $regex: 'pattern', $options: '<options>' } }
        { <field>: { $regex: /pattern/<options> } }

        const search = 'aaa';
        const product = await Product.find({
            name: {$regex: search, $options: 'i'}
        });
     */

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    //* test queryObject
    // {{URL}}/products?featured=false&company=ikea&name=e
    console.log(queryObject); // 6 products



    res.status(200).json({
        message: 'Get dynamic products list by query params',
        nbHits: products.length,
        products: products,
    });
}


module.exports = {
    getProductsStatic,
    getProducts
}
