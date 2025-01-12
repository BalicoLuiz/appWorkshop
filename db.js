const { Client } = require('pg');

// Configuração de conexão com o PostgreSQL
const client = new Client({
  user: 'postgres',         // Seu usuário PostgreSQL
  host: 'junction.proxy.rlwy.net',       // O host do seu banco de dados (ex: 'localhost' ou IP externo)
  database: 'railway',       // O nome do banco de dados
  password: 'cqolvohXCcKxEuxtoJxCzqpNCdkwRdpq',       // Sua senha de acesso ao banco
  port: 30520,                  // Porta padrão do PostgreSQL (pode ser diferente)
  ssl: {
    rejectUnauthorized: false, // Aceitar certificados não verificados (útil para servidores de nuvem como Render)
  },
});

// Conectando ao banco de dados
client.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro de conexão ao banco de dados', err.stack));

module.exports = client;