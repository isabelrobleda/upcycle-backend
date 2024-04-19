const app = require('./app');
const PORT = process.env.PORT || 5005; // Use the PORT environment variable or default to 5005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
