const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Lucas:QaFsDw8QJgFwbTX1@cluster0.otis9lg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Conectado');
  })
  .catch((erro) => {
    console.error('Erro ao conectar:', erro);
  });


module.exports = mongoose;