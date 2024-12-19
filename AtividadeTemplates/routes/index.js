var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log('acessando a página: ${req.orinalUrl}';)
  next();
});


