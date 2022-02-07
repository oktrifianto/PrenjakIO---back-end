const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');
const lib     = require('../controllers/product.controllers');
router.use(express.json());

/**
 * @description   Show all products
 * @method        GET
 * @path          /product
 * @return        all product
 * @todo          limit query with pagination
 * @public
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

/**
 * @description   Show single data
 * @method        GET
 * @path          /product/:id
 * @example       /product/2
 * @public
 */
router.get('/:id', async (req, res) => {
  try {
    const id      = req.params.id;
    if (await lib.checkIDProductExist(id)){
      const data  = await lib.getSingleProduct(id);
      res.status(200).json({
        "status"  : res.statusCode,
        "data"    : data
      });
    } else {
      res.status(404).json({
        "status"  : res.statusCode,
        "message" : "product not found"
      });
    }
  } catch (err) {
    console.log(err)
  }
});

/**
 * @description   Delete Single Product by ID
 * @method        DELETE 
 * @path          /product/:id
 * @protected
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const id    = req.params.id;
    if (await lib.checkIDProductExist(id)){
      const sql = `DELETE FROM product WHERE id="${id}"`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(202).json({
          "status"  : res.statusCode,
          "message" : `Success to deleted product ${id}`
        })
      });
    } else {
      res.status(404).json({
        "status"  : res.statusCode,
        "message" : `Sorry, product id ${id} not exist!`
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;