API de Clientes
Esta API tem como objetivo gerenciar clientes e seus endereços.

Como utilizar
Pré-requisitos
Node.js e npm instalados
MongoDB Atlas
Instalação
Clone este repositório

Instale as dependências:
npm install

Inicie o servido:
npm start

Endpoints: 
GET /clientes : Retorna a lista de todos os clientes cadastrados.
GET /clientes/:id : Retorna um cliente específico com base no ID fornecido na URL.
POST /clientes : Cria um novo cliente com base nos parâmetros fornecidos no corpo da requisição. Os campos necessários são: cnpj, razaoSocial, nomeContato, telefone e endereco. O campo endereco deve ser um objeto que contenha os campos necessários para criar um novo endereço, que são cep, logradouro, numero, bairro, cidade e estado.
PUT /clientes/:id : Atualiza um cliente existente com base no ID fornecido na URL e nos parâmetros fornecidos no corpo da requisição. Os campos que podem ser atualizados são: razaoSocial, nomeContato, telefone e endereco. O campo endereco deve ser um objeto que contenha os campos necessários para atualizar um endereço, que são cep, logradouro, numero, bairro, cidade e estado.
DELETE /clientes/:id : Remove um cliente específico com base no ID fornecido na URL.
POST /clientes/:id/enderecos : Adiciona um novo endereço para um cliente existente com base no ID fornecido na URL. O campo endereco deve ser um objeto que contenha os campos necessários para criar um novo endereço, que são cep, logradouro, numero, bairro, cidade e estado.

Obs: Estou enviando também a collection dos endpoints
