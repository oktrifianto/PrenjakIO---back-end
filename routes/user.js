const express = require('express');
const router  = express.Router();

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

// test function
const CheckDataExist = () => true;

module.exports = router;