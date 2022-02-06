const express = require('express');
const app     = express();
const port    = 3000;

// import from routes
const UserRoutes      = require('./routes/user');
const ProductRoutes   = require('./routes/product');
const WishlistRoutes  = require('./routes/wishlist');
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);
app.use('/wishlist', WishlistRoutes);

/**
 * @description   Only main path
 * @method        GET
 * @path          [domain.com]/
 * @returns       Only message
 */
app.get('/', (req, res) => {
  res.status(200).json({
    "status"  : res.sendStatus,
    "message" : "Welcome to my app"
  });
});

/**
 * @description   Handling 404 [Page Not Found]
 * @method        GET, POST, PUT, DELETE, etc.
 * @path          *
 * @returns       404
 */
app.use("*", (req, res) => {
  res.status(404).json({
    "status"  : res.statusCode,
    "message" : "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});