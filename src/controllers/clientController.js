const Cliente = require('../models/client');
const Endereco = require('../models/endereco');
const axios = require('axios');
module.exports = {
    async store(req, res) {
        const { cnpj, razaoSocial, nomeContato, telefone, endereco } = req.body;
        try {
            const clienteExistente = await Cliente.findOne({ cnpj });

            if (clienteExistente) {
                return res.status(400).send('Cliente já cadastrado.');
            }

            const novoEndereco = new Endereco(endereco);
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${novoEndereco.cep}&key=AIzaSyCQ2Xb5x-QE3QBxV0FZidV_3TTrJnWHhZE`);

            if (data.status === 'OK') {
                novoEndereco.latitude = data.results[0].geometry.location.lat;
                novoEndereco.longitude = data.results[0].geometry.location.lng;
            }

            await novoEndereco.save();

            const novoCliente = new Cliente({
                cnpj,
                razaoSocial,
                nomeContato,
                telefone,
                enderecos: [novoEndereco._id],
            });

            await novoCliente.save();

            return res.status(201).json(novoCliente);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar cliente.');
        }
    },
    async index(req, res) {
        try {
            const clientes = await Cliente.find().populate('enderecos');
            return res.json(clientes);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar clientes.');
        }
    },

    async GetbyId(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id).populate('enderecos');
            if (!cliente) {
                return res.status(404).send('Cliente não encontrado.');
            }
            return res.json(cliente);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar cliente.');
        }
    },
    async delete(req, res) {
        try {
            const cliente = await Cliente.findByIdAndDelete(req.params.id);
            if (!cliente) {
                return res.status(404).send('Cliente não encontrado.');
            }
            return res.send('Cliente removido com sucesso.');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover cliente.');
        }
    },

    async put(req, res) {
        const { razaoSocial, nomeContato, telefone, endereco } = req.body;
        try {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) {
                return res.status(404).send('Cliente não encontrado.');
            }
    
            if (razaoSocial) {
                cliente.razaoSocial = razaoSocial;
            }
            if (nomeContato) {
                cliente.nomeContato = nomeContato;
            }
            if (telefone) {
                cliente.telefone = telefone;
            }
            if (endereco) {
                const enderecoAtualizado = new Endereco(endereco);
                const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${enderecoAtualizado.cep}&key=AIzaSyCQ2Xb5x-QE3QBxV0FZidV_3TTrJnWHhZE`);
                if (data.length > 0) {
                    enderecoAtualizado.latitude = data[0].lat;
                    enderecoAtualizado.longitude = data[0].lon;
                }
                await enderecoAtualizado.save();
                cliente.enderecos = [enderecoAtualizado._id];
            }
    
            await cliente.save();
            return res.json({message: "Cliente atualizado com sucesso!", cliente});
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar cliente.');
        }
    },
    async addEndereco(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) {
                return res.status(404).send('Cliente não encontrado.');
            }
    
            const { endereco } = req.body;
            const novoEndereco = new Endereco(endereco);
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${novoEndereco.cep}&key=AIzaSyCQ2Xb5x-QE3QBxV0FZidV_3TTrJnWHhZE`);
            if (data.status === 'OK') {
                novoEndereco.latitude = data.results[0].geometry.location.lat;
                novoEndereco.longitude = data.results[0].geometry.location.lng;
            }
            await novoEndereco.save();
    
            cliente.enderecos.push(novoEndereco._id);
            await cliente.save();
    
            return res.json(cliente);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar endereço.');
        }
    }
    
    
}