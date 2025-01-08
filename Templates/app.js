var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');  // Roteamento personalizado de 'index.js'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware de log para registrar o acesso a cada página
app.use(logger('dev'));

// Middleware para manipulação de JSON e dados de formulário (URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de cookies
app.use(cookieParser());

// Definindo a pasta pública para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas definidas em routes/index.js
app.use('/', indexRouter);

// Captura de 404 para redirecionar para a página de erro
app.use(function(req, res, next) {
  next(createError(404));
});

// Handler de erro
app.use(function(err, req, res, next) {
  // Definir mensagens de erro para o ambiente de desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
