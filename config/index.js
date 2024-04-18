const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN  || "https://upcyclemyhome.com";

// Middleware configuration
module.exports = (app) => {
  app.set("trust proxy", 1);

  // Enabling CORS properly
  const cors = require('cors');

app.use(cors({
  origin: 'https://upcyclemyhome.com', // Or use '*' to allow all domains
  credentials: true, // If you're dealing with cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed request methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed request headers
}));

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Error handling middleware should be last, after all other middleware and routes
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
