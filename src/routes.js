const express = require('express');

const Client = require('./controllers/clientController')

const router = express.Router();

router.post('/client', Client.store);

router.get('/client', Client.index)

router.get('/client/:id', Client.GetbyId)

router.delete('/client/:id', Client.delete)

router.put('/client/:id', Client.put)

router.post('/client/:id/endereco', Client.addEndereco)


module.exports = router;