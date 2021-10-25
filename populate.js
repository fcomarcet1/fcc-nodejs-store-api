('use strict');

require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/Product');
const productJsonFile = require('./products.json');


const start = async () => {
    try {
        // connect to db
        await connectDB(process.env.MONGODB_CLOUD_URI);
        console.log(`⚡⚡⚡ MongoDB Cloud connection ready at on: mongodb+srv://${process.env.MONGODB_CLOUD_USER}:****%2a@cluster0.mpcxw.mongodb.net/fcc_store_api`);
        // delete documents if exists
        await Product.deleteMany();
        // insert data
        await Product.create(productJsonFile);
        console.log('Insert data in Database done!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();

