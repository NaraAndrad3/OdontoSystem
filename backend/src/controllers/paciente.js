const Paciente = require('../models/paciente')
const Sequelize = require('sequelize')

const cadastrarPaciente = async (req, res) => {
  const {
    nome, cpf, sexo, sus, DataNascimento, telefone, bairro,
    cidade, complemento, cep, estado, numero, estadoCivil
  } = req.body;

  try {
    const novoPaciente = await Paciente.create({
      nome, cpf, sexo, sus, DataNascimento, telefone, bairro,
      cidade, complemento, cep, estado, numero, estadoCivil
    });
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarPacientes = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const pacientes = await Paciente.findAll({
      attributes: ['nome', 'cpf'],
      offset: offset,
      limit: limit
    });
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const buscarPaciente = async (req, res) => {
  const { nome } = req.query;

  try {
      const pacientesEncontrados = await Paciente.findAll({
          where: {
              nome: {
                  [Sequelize.Op.like]: `%${nome}%`
              }
          }
      });
      
      res.status(200).json(pacientesEncontrados);
      
  } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      res.status(500).send('Erro ao buscar paciente. Por favor, tente novamente mais tarde.');
  }
};

module.exports = {
  cadastrarPaciente,
  listarPacientes,
  buscarPaciente
}