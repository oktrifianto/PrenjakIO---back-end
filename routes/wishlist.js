const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');
router.use(express.json());

/**
 * @description   Temporary nothing here
 * @method        GET
 * @path          /wishlist
 */
router.get('/', (req, res) => {
  res.json({
    "status"  : res.statusCode,
    "message" : "Nothing happen in this route"
  });
});

/**
 * @todo
 * 1. add wislist product (auth) (√)
 * 2. show wishlist from user  
 * 3. remove from wishlist (auth)
 * 4. add to cart --- quantities feature
 */

/**
 * @description     Add wishlist product
 * @method          POST
 * @path            /wishlist/:id_product/create/:id_user
 * @todo            show product name
 */
router.post('/:id_product/add/:id_user', (req, res) => {
  try {
    const { id_product, id_user } = req.params;
    const sql = `INSERT INTO wishlist (id_from_product, id_from_user) VALUES ('${id_product}', '${id_user}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({
        "status"    : res.statusCode,
        "message"   : "success add your product to wishlist"
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;