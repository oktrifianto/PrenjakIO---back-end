const db = require('../db/database');

/**
 * @description   Check user has been created or not
 * @param         {email}
 * @returns       boolean
 */
const checkUserExist = email => {
  const sql = `SELECT email FROM user WHERE email="${email}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      if (result.length !== 0) { // exist
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * @description Get password user using email
 * @param       {email}
 * @returns     password for validation
 */
const getPasswordUser = email => {
  const sql = `SELECT password FROM user WHERE email="${email}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) throw reject(err);
      resolve(result[0].password);
    });
  });
}

// Export functions
module.exports = {
  checkUserExist,
  getPasswordUser
}