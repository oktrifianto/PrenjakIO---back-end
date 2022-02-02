const express = require('express');
const db      = require('./db/database');
const app     = express();
const port    = 3000;

// import from routes
const UserRoutes    = require('./routes/user');
const ProductRoutes = require('./routes/product');
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);

app.get('/', (req, res) => {
  res.json({
    "data" : "Hello Prenjak IO"
  });
});

app.get('/customers', (req, res) => {
  const x = 'SELECT * FROM customers';
  db.query(x, (err, result) => {
    if (err) throw err;
    res.json({
      "data"    : result,
      "status"  : 200
    });
  });
});

app.post('/products', (req, res) => {
  res.json({
    "data" : "Success for POST method"
  });
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});