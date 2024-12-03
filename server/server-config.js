require('dotenv').config()
const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const configureServer = (app) => {
    // Middleware
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({
            error: 'Something went wrong!',
            message: err.message
        })
    })

    return app
}

module.exports = configureServer;
