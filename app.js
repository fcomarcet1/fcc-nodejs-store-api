("use strict");

// ********************* IMPORT MODULES *************************
require("dotenv").config();
const express = require("express");
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const nodeInfo = require('nodejs-info');

const app = express();
process.env.TZ="Europe/Madrid"


// ******************* MIDDLEWARES ***************************
app.use(express.json());



// ********************* Request Logger Middleware *************************
app.use(function (req, res, next) {
  // method path - ip
  let logger = 'Method: '+ req.method + ' | ' +'Path: '+ req.path + ' | ' + 'Ip: ' + req.ip;
  console.log(`Request received--> ${logger}`);
  next();
});

// ********************* CORS *******************************


// **************** LOAD FILE ROUTES ************************


// ******************* REWRITE PATH ROUTES *******************


// ********************* TEST ROUTES *************************
app.get("/", (req, res) => {
  res.send(`<h1>Store-API</h1>
            <a href="/api/v1/products">Products link</a>`);
});

app.get("/node-info", (req, res) => {
  res.send(nodeInfo(req));
});

//!! Use this middleware here not in Middlewares defines
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// ********************* HTTP SERVER && DB *************************
const port = process.env.APP_PORT;

// DB && http server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_CLOUD_URI);
    console.log(`🚀 MongoDB Cloud connection ready at on: mongodb+srv://${process.env.MONGODB_CLOUD_USER}:****%2a@cluster0.mpcxw.mongodb.net/fcc_store_api`);
    app.listen(port, () => {
      console.log(`🚀 Server ready at on: http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();



// ********************* EXPORT APP *************************
module.exports = app;