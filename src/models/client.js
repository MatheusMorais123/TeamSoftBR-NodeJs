const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  cnpj: {
    type: String,
    required: true,
  },
  razaoSocial: {
    type: String,
    required: true,
  },
  nomeContato: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  enderecos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endereco',
  }],
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;