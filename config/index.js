// const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();

module.exports = function(app) {

  // Middleware Configuration
  app.use(cors({
    origin: ['https://upcyclemyhome.com', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  // Error Handling Middleware
  // Correctly implemented as it now correctly uses four parameters
  app.use((err, req, res, next) => {
    // Check if the headers have already been sent to the client
    if (res.headersSent) {
      // If headers are sent, delegate to the default Express error handler
      return next(err);
    }
    // Otherwise, log the error and send an appropriate server error response
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}
