const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

const Funcionario = sequelize.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11), // CPF tem 11 dígitos
    allowNull: false,
    unique: true // CPF deve ser único
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F', 'Outro'), // use ENUM para valores específicos
    allowNull: false
  },
  sus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DataNascimento: {
    type: DataTypes.DATEONLY, // use DATEONLY para datas sem hora
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complemento: {
    type: DataTypes.STRING,
    allowNull: true // complemento pode ser nulo
  },
  cep: {
    type: DataTypes.STRING(8), // CEP tem 8 dígitos
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(2), // estados brasileiros têm 2 caracteres
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estadoCivil: {
    type: DataTypes.ENUM('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Outro'), // use ENUM para valores específicos
    allowNull: false
  }
});

module.exports = Funcionario;
