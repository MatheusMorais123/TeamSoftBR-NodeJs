const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const PORT =  3333


mongoose.connect('mongodb+srv://matheusmorais030303:133578@cluster0.wayyxsq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

