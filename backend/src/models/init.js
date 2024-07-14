const sequelize = require('../db/connection'); 

const Dentista = require('./dentista')
const Pacientes = require('./paciente')
const Agenda = require('./agenda')

// criar relacionamento entre tabelas

sequelize.sync()
  .then(() => {
    console.log('Tabelas criadas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabelas:', error);
});