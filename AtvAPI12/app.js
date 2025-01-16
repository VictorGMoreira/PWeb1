// Importar as dependências
const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');

// Criar a aplicação Express
const app = express();

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Diretório das views

// Middleware para logs de acesso
app.use(morgan('dev'));

// Middleware para servir arquivos estáticos (como CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Função para obter o preço do Bitcoin
async function getBitcoinPrice(currency) {
  const url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

  try {
    const response = await axios.get(url);
    console.log(response.data); // Log da resposta da API para ver o que está sendo retornado

    // Verifica se a resposta contém a chave "bpi" e a moeda específica
    if (response.data && response.data.bpi && response.data.bpi[currency]) {
      return response.data.bpi[currency].rate; // Retorna o preço da moeda
    } else {
      console.log(`Erro: Dados não encontrados para ${currency}`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar o preço do Bitcoin para ${currency}:`, error);
    return null;
  }
}

// Rota principal para obter o preço do Bitcoin com base na moeda
app.get('/:currency', async (req, res) => {
  const currency = req.params.currency.toUpperCase();

  // Verificar se a moeda é válida (USD, EUR, GBP)
  if (!['USD', 'EUR', 'GBP'].includes(currency)) {
    return res.render('error', { message: 'Moeda inválida. Use USD, EUR ou GBP.' });
  }

  try {
    // Obter o preço do Bitcoin
    const price = await getBitcoinPrice(currency);
    const date = new Date().toLocaleString(); // Data atual

    if (price) {
      // Objeto 'b' com os dados a serem passados para a view
      const b = {
        chartName: 'Bitcoin Price',
        bpi: {
          [currency]: {
            rate: price
          }
        },
        time: {
          updated: date
        },
        disclaimer: 'As informações são fornecidas pela API CoinDesk.'
      };

      // Passando o objeto 'b' e a moeda 'currency' para a view 'index'
      res.render('index', { b, currency });
    } else {
      res.render('error', { message: 'Erro ao buscar o preço do Bitcoin.' });
    }
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Erro ao buscar os dados.' });
  }
});

// Página de erro (caso a moeda não seja válida ou ocorra algum erro)
app.get('/error', (req, res) => {
  res.render('error', { message: 'Página não encontrada ou erro ao carregar os dados.' });
});

// Configuração do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

