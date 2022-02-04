const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');
router.use(express.json());

/**
 * @desc Show all products
 * @method GET
 * @public
 * @url /product
 */
router.get('/', (req, res) => {
  try {
    const sql = `SELECT * FROM product`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        "status"  : res.statusCode,
        "data"    : result
      });
    });
  } catch(err){
    console.log(err);
  }
});

/**
 * @description   Create new product
 * @method        POST
 * @path          /product/new
 * @protected
 */
router.post('/new', auth, (req, res) => {
  try {
    const { name, price, image, rating, description, qty } = req.body;
    const sql = `INSERT INTO 
      product (name, price, image, rating, description, qty) 
      VALUES ('${name}', ${price}, '${image}', ${rating}, '${description}', ${qty})`;
    
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({
        "status"  : res.statusCode,
        "message" : "success create new product"
      });
    });
    
  } catch(err){
    console.log(err);
  }
});

module.exports = router;