const express = require('express')
const mysql   = require('mysql')
const app     = express()
const port    = 3000
require('dotenv').config()

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