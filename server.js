const https = require("https");
const fs = require("fs");
const app = require("./app");

// Load SSL/TLS Certificates
const keyPath = '/Users/isabelrobleda/Desktop/Upcycle/upcycle-vendor-form/upcycle-backend/localhost-key.pem';
const certPath = '/Users/isabelrobleda/Desktop/Upcycle/upcycle-vendor-form/upcycle-backend/localhost.pem';
const key = fs.readFileSync(keyPath, 'utf8');
const cert = fs.readFileSync(certPath, 'utf8');
const httpsOptions = { key, cert };

// HTTPS Server Setup
const server = https.createServer(httpsOptions, app);

// Start Server
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
