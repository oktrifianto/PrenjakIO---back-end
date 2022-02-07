const db = require('../db/database');
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

module.exports = {
  getSingleProduct,
  checkIDProductExist
}