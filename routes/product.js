const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');
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
    const checkId = await checkIDProductExist(id);
    if (checkId){
      const data  = await getSingleProduct(id);
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
 * @description   Get single product
 * @param         {id} 
 * @returns       {id, name, price, image_link, rating, desc, qty}
 */
const getSingleProduct = id => {
  const sql = `SELECT * FROM product WHERE id="${id}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      resolve(result[0]);
    });
  });
}

/**
 * @description     Check ID Product if exist
 * @returns         boolean (true/false)
 *                  (true)    ID exist
 *                  (false)   ID not exist
 * @param           {id} from product
 */
const checkIDProductExist = id => {
  const sql = `SELECT id FROM product WHERE id="${id}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      result.length !== 0 ? resolve(true) : resolve(false);
    });
  });
}

module.exports = router;