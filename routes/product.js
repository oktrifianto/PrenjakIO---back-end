const express = require('express');
const router  = express.Router();
const db      = require('../db/database');

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

module.exports = router;