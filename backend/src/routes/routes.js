const express = require('express')
const routes = express()

// novos
const { cadastrarPaciente, listarPacientes, buscarPaciente } = require('../controllers/paciente')
const {cadastrarDentista, listarDentistas, buscarDentista} = require('../controllers/dentista')

// Paciente
routes.post('/paciente', cadastrarPaciente)
routes.get('/pacientes', listarPacientes)

routes.get('/buscarPaciente', buscarPaciente)

//router.post('/cadastrarPaciente', pacienteController.cadastrarPaciente);

// Dentista
routes.post('/dentista', cadastrarDentista)
routes.get('/dentistas', listarDentistas)
routes.get('/buscarDentista', buscarDentista)


module.exports = routes