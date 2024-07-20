const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

const Agenda = sequelize.define('Agenda', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dataConsulta: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Agenda;