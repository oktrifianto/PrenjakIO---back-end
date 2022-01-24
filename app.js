const express = require('express')
const mysql   = require('mysql')
const app     = express()
const port    = 3000
require('dotenv').config()

const con = mysql.createConnection({
  host      : process.env.DB_HOST,
  user      : process.env.DB_USER,
  password  : process.env.DB_PASSWORD,
  database  : process.env.DB_NAME
})

con.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected")
})

app.get('/', (req, res) => {
  res.json({
    "data" : "Hello Prenjak IO"
  })
})

app.post('/products', (req, res) => {
  res.json({
    "data" : "Success for POST method"
  })
})

app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})