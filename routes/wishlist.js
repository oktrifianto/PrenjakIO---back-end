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

module.exports = router;