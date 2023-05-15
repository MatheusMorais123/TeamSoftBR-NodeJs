const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
  logradouro: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  complemento: String,
  bairro: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
});

const Endereco = mongoose.model('Endereco', enderecoSchema);

module.exports = Endereco;