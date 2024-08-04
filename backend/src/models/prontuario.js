const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Prontuario = sequelize.define('Prontuario', {
  anamnese: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  historico_medico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  historico_odontologico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  exame_clinico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  exame_complementar: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prescricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tratamento: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataConsulta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horaConsulta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

});

module.exports = Prontuario;
