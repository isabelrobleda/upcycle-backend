const app = require("./app");
const https = require('https');
const fs = require('fs');

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Start HTTPS server if certificates exist
https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server running on https://192.168.178.103:${PORT}`);
});
