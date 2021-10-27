'use strict';

const Product = require('../models/Product');

/**
 * Get static products list
 * in this case we pass static field for find
 */
const getProductsStatic = async (req, res) => {

    //const testQuery = await Product.find({}).sort('-name price');
    //const products = await Product.find({company: 'ikea'});

    const products = await Product.find({price: {$gt: 30}})
        .sort('price')
        .select('name price');

    if (products.length === 0) {
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
 * {{URL}}/products?name=albany%20table&featured=false&page=3...
 * with this method we can get other params(not included in Schema) ->page for example
 */
const getProducts = async (req, res) => {

    //const products = await Product.find(req.query);

    //posibles values for filter search in query params
    // metemos sort para filtrar por orden
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {};

    //* Featured
    //api/v1/products?featured=true
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    //* company
    // company in Schema is type: String and enum
    // enum: { values: ['ikea', 'liddy', 'caressa', 'marcos']}
    //api/v1/products?featured=false&company='ikea'
    if (company) {
        queryObject.company = company;
    }

    //* name
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
        queryObject.name = {$regex: name, $options: 'i'};
    }


    //* Numeric Filters -> example products with price < 35
    // {{URL}}/products?numericFilters=price>30,rating>=4
    if (numericFilters) {

        // define operators
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        /**
         * replace(searchValue, replaceValue)
            let str = "Visit Microsoft!";
            str.replace("Microsoft", "W3Schools"); -> Visit W3Schools
         */
        //
        let filters = numericFilters.replace(
            regEx, 
            (match) => `-${operatorMap[match]}-`
        );
        //console.log(filters); // price-$gt-50,rating-$gte-4 (String)

        const options = ['price', 'rating'];

        /**
         * The split() method splits a string into an array of substrings, and returns the array.
            let str = "How are you doing today?";
            const myArr = str.split(" "); --> [ 'How', 'are', 'you', 'doing', 'today?' ]
         */
        // recorremos string -> price-$gt-50,rating-$gte-4
        filters = filters.split(',').forEach((item) => {

            // destructuring values for separate for ex price-$gt-40,rating-$gte-40
            const [field, operator, value] = item.split('-'); 
            
            //console.log(field); // price /n rating /n
            //console.log(operator); // $gt /n  $gte /n 
            //console.log(value) // 50 /n  4 /n
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
            // {{URL}}/products?numericFilters=price>50,rating>=4
            //console.log('filters value: ' + filters); // price-$gt-50,rating-$gte-4 
        });
    }
    // {{URL}}/products?numericFilters=price>50,rating>=4
    //console.log(queryObject); // { price: { '$gt': 50 }, rating: { '$gte': 4 } }
    let result = Product.find(queryObject);


    //*  we sort for fields received in sort param or by date
    if (sort) {
        // sort = (string)(name, -price), we need remove ','
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
        console.log(result);
    } else {
        const sortByDate = 'createAt'
        result = result.sort(sortByDate);
    }

    //* sort by fields
    // {{URL}}/products?sort=-name,price&field=company
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        console.log(fieldsList);
        result = result.select(fieldsList);
    }

    //* Limit & page
    // {{URL}}/products?sort=-name,&fields=name, price&limit=3&page=2
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)

    const products = await result;
    //const products = await Product.find(queryObject);

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
