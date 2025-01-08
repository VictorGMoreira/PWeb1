const express = require('express');

const app = express();

const PORT = 8000;



// Função para obter a mensagem com base no idioma

function getMessage(language) {

  const messages = {

    'pt-br': 'Olá Mundo',

    'en': 'Hello World',

    'es': 'Hola, mundo'

  };

  // Retorna a mensagem ou uma mensagem de erro caso o idioma não seja encontrado

  return messages[language] || 'Idioma não suportado';

}



// Rota padrão

app.get('/', (req, res) => {

  res.send('Hello, World!');

});



// Rota versão 2

app.get('/v2/:name/json', (req, res) => {

  res.json({ msg: 'Hello ' + req.params.name });

});



// Rota versão 3 com idioma

app.get('/v3/:language', (req, res) => {

  const language = req.params.language;  // Corrigido: "params" em vez de "parasm"

  const message = getMessage(language);

  res.json({ msg: message });

});

app.get('/v3/*', (req, res) => {

  res.json({erro: 'invalid endpoint'})

});

// Inicia o servidor na porta 8000

app.listen(PORT, () => {

  console.log(`Hello API running on port ${PORT}`);

});