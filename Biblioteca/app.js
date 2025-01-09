const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = [
  {
    id: 1,
    titulo: 'Ainda estou aqui',
    autor: 'Sarah J. Mass',
    editora: 'globo',
    ano: '1999',
    quant: '12',
    preço: '40',
  }
];

// Rota GET para obter todos os livros
app.get('/biblioteca', (req, res) => {
  res.json(db);
});

// Rota POST para adicionar um novo livro
app.post('/biblioteca', (req, res) => {
  let lastId = Math.max(...db.map(u => u.id));
  const livro = {
    id: ++lastId,
    titulo: req.body.title,
    autor: req.body.author,
    editora: req.body.editor,
    ano: req.body.year,
    quant: req.body.amount,
    preço: req.body.price,
  };
  db.push(livro);
  res.json(livro);
});

// Rota GET para obter um livro específico pelo ID
app.get('/biblioteca/:id', (req, res) => {
  const livro = db.find(u => u.id === parseInt(req.params.id));
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Rota DELETE para remover um livro pelo ID
app.delete('/biblioteca/:id', (req, res) => {
  const index = db.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    db.splice(index, 1);
    res.json({ message: 'Livro deletado com sucesso', db });
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Inicializa o servidor na porta 3000
app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});
