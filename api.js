const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');
//
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/proxys', async (req, res) => {
        const { nome_api } = req.query;
        if (!nome_api) {
            return res.status(400).send('O parâmetro "nome_api" é obrigatório');
          }
        const query = 'SELECT * FROM funcionarios WHERE nome ILIKE $1';
        const values = [`%${nome_api}%`];
        client.query(query, values)
        .then(result => {
          if (result.rows.length === 0) {
            return res.status(404).json({ message: 'nome_api não encontrado.' });
          }
          res.setHeader('Content-Type', 'application/json');
          let response = result.rows
          res.status(200).json(response); // Retorna o primeiro resultado encontrado
        })
        .catch(err => {
          console.error('Erro ao consultar o banco de dados:', err);
          res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
        });
    });
        // Rota de exemplo (POST)
        app.post('/proxys', (req, res) => {
            const { nome_api, metodos } = req.body; // Pegando os dados do corpo da requisição

  
            // Consulta SQL para inserir os dados na tabela
            const query = 'INSERT INTO funcionarios (nome_api, metodos) VALUES ($1, $2) RETURNING id';
            const values = [nome_api, metodos];
            client.query(query, values)
            .then(() => {
              res.status(201).json({ message: 'API inserida com sucesso!' });
            })
            .catch((err) => {
              console.error('Erro ao inserir dados:', err);
              res.status(422).json({ message: 'Erro ao inserir API no banco de dados' });
            });
        });
        
        // Iniciando o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
