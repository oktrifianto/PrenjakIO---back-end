const db  = require('../db/database');
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

module.exports = {
  getIDUser,
  getArrayWishlist,
  getUserWishlist,
  checkWishlistExist
}