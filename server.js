const app = require('./app');
const PORT = process.env.PORT || 5005; // Use the PORT environment variable or default to 5005

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html')),
  function (err){
    if(err){
      res.status(500).send(err)
    }}
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
