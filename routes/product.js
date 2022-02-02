const express = require('express');
const router  = express.Router();

/**
 * @desc Show all products
 * @method GET
 * @public
 * @url /product
 */
router.get('/', (req, res) => {
  res.status(200)
    .json({
      "status" : res.statusCode,
      "message": "Show all products"
    });
});

module.exports = router;