const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

// Definição do modelo
const Dentista = sequelize.define('Dentista', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estadoCivil: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  telefoneCelular: {
    type: Sequelize.STRING
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cartaoSUS: {
    type: Sequelize.STRING
  },
  bairro: {
    type: Sequelize.STRING
  },
  cidade: {
    type: Sequelize.STRING
  },
  complemento: {
    type: Sequelize.STRING
  },
  cep: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  especialidade: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numeroInscricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  documentoIdentificacao: {
    type: Sequelize.STRING // Aqui armazenaremos o caminho do arquivo
  },
  horarioInicio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horarioFim: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Dentista;