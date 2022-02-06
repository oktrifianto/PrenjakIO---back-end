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
 * 2. show wishlist from user (√)
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
    const id_user   = await getIDUser(username);

    if (await checkWishlistExist(id_user)){
      // get array of wishlist
      const arrayWishlist = await getArrayWishlist(id_user); // array => id_wishlist
      
      // looping to get wishlist one by one
      let data = [];
      for (let i = 0; i < arrayWishlist.length; i++){
        data.push(await getUserWishlist(arrayWishlist[i]));
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


///////////////////////////////////
///////// FUNCTIONS ///////////////
///////////////////////////////////
/**
 * @description   Get ID from user using username
 * @param         {username}
 * @returns       {id}
 */
const getIDUser = username => {
  const sql   = `SELECT id FROM user WHERE username='${username}'`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      resolve(result[0].id);
    });
  });
}

/**
 * @description   Get Data Wishlist in Array
 * @param         {id} 
 * @returns       {Array}
 *                [ '1', '2', '4' ]
 */
const getArrayWishlist = id => {
  const sql = `SELECT id_from_product FROM wishlist WHERE id_from_user='${id}'`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      if (result.length > 0) {
        let arrayWislist = [];
        for(let i = 0; i < result.length; i++){
          arrayWislist.push(result[i].id_from_product); // push result to array
        }
        resolve(arrayWislist);
      }
    });
  });
}

/**
 * @description   Show one of user wishlist
 * @param         {id} 
 * @returns       single array
 *                {id, name, price, rating, etc.}       
 */
const getUserWishlist = id => {
  const sql = `SELECT * FROM product WHERE id="${id}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      resolve(result[0]);
    });
  });
}

/**
 * @description Check Wishlist Existed or Not
 * @param       {id}
 * @returns     boolean
 */
const checkWishlistExist = id => {
  const sql = `SELECT * FROM wishlist WHERE id_from_user="${id}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      result.length > 0 ? resolve(true) : resolve(false);
    });
  });
}

module.exports = router;