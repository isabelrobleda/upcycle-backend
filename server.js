const app = require('./app');
const https = require('https');
const fs = require('fs');
const PORT = process.env.PORT || 5005; // Use the PORT environment variable or default to 5005

// Check if running in a secure environment and certificates are available
if (process.env.NODE_ENV === 'production' && fs.existsSync('server.key') && fs.existsSync('server.cert')) {
  const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  };
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
  });
}
