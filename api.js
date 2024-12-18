const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');
//
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/funcionarios', async (req, res) => {
        const { nome } = req.query;
        if (!nome) {
            return res.status(400).send('O parâmetro "nome" é obrigatório');
          }
        const query = 'SELECT * FROM funcionarios WHERE nome ILIKE $1';
        const values = [`%${nome}%`];
        client.query(query, values)
        .then(result => {
          if (result.rows.length === 0) {
            return res.status(404).json({ message: 'funcionario não encontrado.' });
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
        app.post('/funcionarios', (req, res) => {
            const { nome, cargo, email } = req.body; // Pegando os dados do corpo da requisição

  
            // Consulta SQL para inserir os dados na tabela
            const query = 'INSERT INTO funcionarios (nome, cargo, email) VALUES ($1, $2, $3) RETURNING id';
            const values = [nome, cargo, email];
            client.query(query, values)
            .then(() => {
              res.status(201).json({ message: 'Usuário inserido com sucesso!' });
            })
            .catch((err) => {
              console.error('Erro ao inserir dados:', err);
              res.status(422).json({ message: 'Erro ao inserir usuário no banco de dados' });
            });
        });
        
        // Iniciando o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
