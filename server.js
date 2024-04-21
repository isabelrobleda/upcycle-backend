const app = require('./app');
const PORT = process.env.PORT || 5005; // Use the PORT environment variable or default to 5005

  // Inside your main server file, after setting up middleware but before starting the server
  app.get('/', (req, res) => {
    res.status(200).send('Upcycle Backend is running!');
  });
  
    
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
