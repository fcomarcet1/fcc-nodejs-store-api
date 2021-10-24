("use strict");

require("dotenv").config();
const express = require("express");
const connectDB = require('./db/connect');

const app = express();


// Request Logger Middleware
app.use(function (req, res, next) {
  // method path - ip
  let logger = 'Method: '+ req.method + ' | ' +'Path: '+ req.path + ' | ' + 'Ip: ' + req.ip;
  console.log(`Request--> ${logger}`);
  next();
})

// test route
app.get("/", (req, res) => {
  res.send(`<h1>Store-API</h1>
            <a href="#">Products link</a>`);
});


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
