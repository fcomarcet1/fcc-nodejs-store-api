("use strict");

// ********************* IMPORT MODULES *************************
require("dotenv").config();
const express = require("express");
const connectDB = require('./db/connect');
const nodeInfo = require('nodejs-info');

const app = express();

process.env.TZ="Europe/Madrid"


// ******************* MIDDLEWARES ***************************



// ********************* Request Logger Middleware *************************
app.use(function (req, res, next) {
  // method path - ip
  let logger = 'Method: '+ req.method + ' | ' +'Path: '+ req.path + ' | ' + 'Ip: ' + req.ip;
  console.log(`Request--> ${logger}`);
  next();
});

// ********************* CORS *******************************


// **************** LOAD FILE ROUTES ************************


// ******************* REWRITE PATH ROUTES *******************


// ********************* TEST ROUTES *************************
app.get("/", (req, res) => {
  res.send(`<h1>Store-API</h1>
            <a href="#">Products link</a>`);
});

app.get("/node-info", (req, res) => {
  res.send(nodeInfo(req));
});


// ********************* HTTP SERVER && DB *************************
const port = process.env.APP_PORT;

// DB && http server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_CLOUD_URI);
    app.listen(port, () => {
      console.log(`🚀 Server ready at on: http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT} `);}
    );
  } catch (error) {
    console.log(error);
  }
};

start();



// ********************* EXPORT APP *************************
module.exports = app;