var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('other', { title: 'Contact' , content: ""});
  console.log('Usuário entrou em Contact')
});

module.exports = router;