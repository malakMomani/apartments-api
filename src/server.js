'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

app.use(cors());

app.get('/', (req, res) => {
  res.send('Success')
})

function start() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log('listening to PORT', PORT);
  })
}
function connect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() =>{
    console.log('Connected to MongoDB');
  }).catch((err) =>{
    console.log('ERROR ---->' ,err)
  })
}


module.exports = {
  start : start,
  connect : connect
}