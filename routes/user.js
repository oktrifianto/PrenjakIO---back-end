const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const auth    = require("../middleware/auth");
const lib     = require('../controllers/user.controllers');
require('dotenv').config();
router.use(express.json()); // enable request body

/**
 * @description   Nothing here
 * @method        GET, POST
 * @path          /user
 * @returns       only some message
 */
router.get('/', (req, res) => {
  res.status(200).json({
    "status"  : res.statusCode,
    "message" : "Get user, nothing here"
  })
}).post('/', (req, res) => {
  res.status(200).json({
    "status"  : res.statusCode,
    "message" : "Post user, nothing here!"
  });
});

/**
 * @description     Signup using jsonwebtoken
 * @method          POST
 * @path            /user/signup
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    // Validate input
    if (!(username && email && password)) {
      res.status(400).json({"message": "All input is required."});
    }
  
    if (await lib.checkUserExist(email)){ // check email
      res.status(400).json({
        "status"  : res.statusCode,
        "message" : "Email exist"
      });
    } else if (await lib.checkUsernameExist(username)) { // check username
      res.status(400).json({
        "status"  : res.statusCode,
        "message": "Username exist"
      });
    } else {
      // Encrypt password
      const newPassword = await bcrypt.hash(password, 10);
      
      // Create token
      const privateKey  = process.env.TOKEN_KEY;
      const token       = jwt.sign({email}, privateKey, {expiresIn: "2h",});
      
      // Save to database
      const sql = `INSERT INTO user (username, email, password, token) VALUES ('${username}', '${email}', '${newPassword}', '${token}')`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(201).json({
          "message": "You have successfully register",
          "status" : res.statusCode,
          "data" : {
            "token"   : token,
            "username": username,
            "email"   : email,
            "password": newPassword
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * @description   Login using jsonwebtoken
 * @method        POST
 * @path          /user/login
 */
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    
    // Validate input
    if (!(email && password)){
      res.status(400).json({
        "status": 400,
        "message": "All input is required"
      });
    }

    // Get password from database
    const ps = await lib.getPasswordUser(email);

    // Check user is exist && compare password
    if ( await lib.checkUserExist(email) && await bcrypt.compare(password, ps) ){
      const privateKey  = process.env.TOKEN_KEY;
      const token       = jwt.sign({email}, privateKey, {expiresIn: "2h",});

      // Save token to database
      const sql = `UPDATE user SET token='${token}' WHERE email='${email}'`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json({
          "status"  : 200,
          "message" : "Login Success",
          "token"   : token
        });
      });
      return; // for next
    }

    res.status(400).json({
      "message": "Invalid Credentials"
    });

  } catch (err) {
    console.log(err);
  }
});

// Route For Test Auth
router.get('/welcome', auth, (req, res) => {
  res.status(200).send("Hi, welcome!");
});

module.exports = router;