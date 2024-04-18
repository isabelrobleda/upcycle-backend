const express = require("express");
const https = require("https");
const fs = require("fs");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// App Initialization
const app = express();
app.set("trust proxy", 1);

// Load SSL/TLS Certificates
const key = fs.readFileSync(path.join(__dirname, 'localhost-key.pem'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, 'localhost.pem'), 'utf8');

// CORS Configuration
app.use(cors({
  origin: ['https://upcyclemyhome.com', 'http://localhost:5173'], // Corrected to include both origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// HTTPS Server Setup
const httpsOptions = { key, cert };
const server = https.createServer(httpsOptions, app);

// Start Server
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});
