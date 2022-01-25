const express = require('express');
const router  = express.Router();
router.use(express.json()); // enable request body

/**
 * Method: GET
 * /user
 * 
 */
router.get('/', (req, res) => {
  res.json({
    "data": "From user is success"
  })
});

/**
 * Method: GET, POST
 * /user/halo
 * 
 */
router.get('/halo', (req, res) => {
  if (CheckDataExist()) {
    res.json({
      "data": "Halo from user! True bos"
    });
  } else {
    res.json({
      "data": "Halo from user! False"
    });
  }
}).post('/halo', (req, res) => {
  res.json({
    "data" : "Post method!!"
  })
});

/**
 * Sign Up
 * Method: POST
 * @url : /user/signup
 */
router.post('/signup', (req, res) => {
  const username      = req.body.username;
  const email         = req.body.email;
  const raw_password  = req.body.password;
  res.json({
    username,
    email
  });
});

// test function
const CheckDataExist = () => true;

module.exports = router;