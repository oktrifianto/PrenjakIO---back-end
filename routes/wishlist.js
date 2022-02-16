const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');
const lib     = require('../controllers/wishlist.controllers');
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
 * 2. show wishlist from user (√)
 * 3. remove from wishlist (auth)
 * 4. add to cart --- quantities feature
 */

/**
 * @description     Add wishlist product
 * @method          POST
 * @path            /wishlist/:id_product/add/:id_user
 * @todo            show product name     ex. product x is successfully added to wishlist (√)
 *                  handle duplicate wishlist
 */
router.post('/:id_product/add/:id_user', async (req, res) => {
  try {
    const { id_product, id_user } = req.params;
    const productName = await lib.getProductName(id_product);
    if (await lib.checkWishlistByUser(id_user, id_product)) { // wishlist exist
      res.status(409).json({
        "status" : res.statusCode,
        "message" : "Sorry, your wishlist is already exist."
      });
    } else { 
      const sql = `INSERT INTO wishlist (id_from_product, id_from_user) VALUES ('${id_product}', '${id_user}')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(201).json({
          "status"    : res.statusCode,
          "message"   : `success added ${productName} to your wishlist`
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * @description     Show wishlist from single user
 * @method          GET
 * @path            /wishlist/:username
 * @requires        getIDUser(),getArrayWishlist(),getUserWishlist()
 *                 
 */
router.get('/:username', async (req, res) => {
  try {
    const username  = req.params.username;
    const id_user   = await lib.getIDUser(username);

    if (await lib.checkWishlistExist(id_user)){
      // get array of wishlist
      const arrayWishlist = await lib.getArrayWishlist(id_user); // array => id_wishlist
      
      // looping to get wishlist one by one
      let data = [];
      for (let i = 0; i < arrayWishlist.length; i++){
        data.push(await lib.getUserWishlist(arrayWishlist[i]));
      }

      res.status(200).json({
        "status"  : res.statusCode,
        "data"    : data
      });
    } else {
      res.status(404).json({
        "status"  : res.statusCode,
        "message" : "sorry, user don't have wishlist"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;