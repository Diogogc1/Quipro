const redis = require('redis');

// Conectar ao Redis localmente
const client = redis.createClient({
    url: process.env.REDIS_URL,
    // Se precisar de senha, usar: 'redis://:your_redis_password@localhost:6379'
  });

client.connect()
          .then(() => client.select(1)) // Seleciona o banco 1 para este projeto
          .then(()=> console.log('Conectado ao Redis'))
          .catch(error=> console.error('Erro ao conectar ao Redis:', error));

// Lidar com erros durante a execução
client.on('error', function(error) {
    console.error('Erro ao conectar ao Redis:', error);
});

  module.exports = client;