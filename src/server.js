require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

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

module.exports = {
  start : start
}