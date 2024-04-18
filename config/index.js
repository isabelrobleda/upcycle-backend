const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173" || "https://upcyclemyhome.com";

// Middleware configuration
module.exports = (app) => {
  app.set("trust proxy", 1);

  // Enabling CORS properly
  app.use(cors({
    origin: [FRONTEND_URL], // This assumes FRONTEND_URL is an array which it currently is not; adjust accordingly.
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
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
