'use strict';
module.exports = (req, res, next) =>{
  console.log('NOT FOUND HANDLER');
  let error = {error: 'Resourse Not Found'};
  res.statusCode = 404;
  res.statusMessage = 'Resourse Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
}