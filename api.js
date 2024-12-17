const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/funcionarios', async (req, res) => {
        const { name } = req.query;
        if (!name) {
            return res.status(400).send('O parâmetro "name" é obrigatório');
          }
        const query = 'SELECT * FROM funcionarios WHERE nome ILIKE $1';
        const values = [`%${name}%`];
        client.query(query, values)
        .then(result => {
          if (result.rows.length === 0) {
            return res.status(404).json({ message: 'funcionario não encontrado.' });
          }
          res.setHeader('Content-Type', 'application/json');
          let response = result.rows
          let responseArr = [];
          for(var i in response){
          let responseTransformado = {
            id: response[i].id,
            name: response[i].nome,
            function: response[i].cargo,
            email: response[i].email
          }
          responseArr.push(responseTransformado)
          res.status(200).json(response); // Retorna o primeiro resultado encontrado
        }})
        .catch(err => {
          console.error('Erro ao consultar o banco de dados:', err);
          res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
        });
    });
        // Rota de exemplo (POST)
        app.post('/funcionarios', (req, res) => {
            const { id, nome, cargo, email } = req.body; // Pegando os dados do corpo da requisição

  
            // Consulta SQL para inserir os dados na tabela
            const query = 'INSERT INTO funcionarios (id, nome, cargo, email) VALUES ($1, $2, $3, $4)';
            const values = [id, nome, cargo, email];
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
