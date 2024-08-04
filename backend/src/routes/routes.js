const express = require('express')
const routes = express()

// novos
const { cadastrarPaciente, listarPacientes, buscarPaciente } = require('../controllers/paciente')
const {cadastrarDentista, listarDentistas, buscarDentista, inserirProntuario, buscarProntuarioPorCPF} = require('../controllers/dentista')
const {getWeek, criarConsulta} = require('../controllers/calendar')
const {cadastrarFuncionario,listarFuncionarios, buscarFuncionario} = require('../controllers/funcionario')


  
  
// Paciente
routes.post('/paciente', cadastrarPaciente)
routes.get('/pacientes', listarPacientes)
routes.get('/buscarPaciente', buscarPaciente)


//router.post('/cadastrarPaciente', pacienteController.cadastrarPaciente);

// Dentista
routes.post('/dentista', cadastrarDentista)
routes.get('/dentistas', listarDentistas)
routes.get('/buscarDentista', buscarDentista)

//Prontuario

routes.post('/prontuario', inserirProntuario)
routes.get('/prontuario/:cpf', buscarProntuarioPorCPF)

// agenda
routes.post('/agenda', getWeek)
routes.post('/consulta', criarConsulta)

// --> gerentes
// funcionarios

routes.post('/funcionario', cadastrarFuncionario)
routes.get('/funcionarios', listarFuncionarios)
routes.get('/buscarFuncionarios', buscarFuncionario)



module.exports = routes