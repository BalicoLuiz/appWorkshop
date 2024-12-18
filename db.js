const { Client } = require('pg');

// Configuração de conexão com o PostgreSQL
const client = new Client({
  user: 'spreadapplicationworkshop_user',         // Seu usuário PostgreSQL
  host: 'dpg-ctc2vd52ng1s73btafkg-a.oregon-postgres.render.com',       // O host do seu banco de dados (ex: 'localhost' ou IP externo)
  database: 'spreadapplicationworkshop',       // O nome do banco de dados
  password: 'WUe0HSoUXYHFNbyk2k0v4mtDZiMxZIII',       // Sua senha de acesso ao banco
  port: 5432,                  // Porta padrão do PostgreSQL (pode ser diferente)
  ssl: {
    rejectUnauthorized: false, // Aceitar certificados não verificados (útil para servidores de nuvem como Render)
  },
});

// Conectando ao banco de dados
client.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro de conexão ao banco de dados', err.stack));

module.exports = client;