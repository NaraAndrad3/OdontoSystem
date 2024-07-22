const Funcionario = require('../models/funcionario')
const Sequelize = require('sequelize')

const cadastrarFuncionario = async (req, res) => {
  const {
    nome, cpf, sexo, sus, DataNascimento, telefone, bairro,
    cidade, complemento, cep, estado, numero, estadoCivil
  } = req.body;

  try {
    const novoFuncionario = await Funcionario.create({
      nome, cpf, sexo, sus, DataNascimento, telefone, bairro,
      cidade, complemento, cep, estado, numero, estadoCivil
    });
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarFuncionarios = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const funcionario = await Funcionario.findAll({
      attributes: ['nome', 'cpf'],
      offset: offset,
      limit: limit
    });
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const buscarFuncionario = async (req, res) => {
  const { nome } = req.query;

  try {
      const funcionarioEncontrados = await Funcionario.findAll({
          where: {
              nome: {
                  [Sequelize.Op.like]: `%${nome}%`
              }
          }
      });
      
      res.status(200).json(funcionarioEncontrados);
      
  } catch (error) {
      console.error('Erro ao buscar Funcionário:', error);
      res.status(500).send('Erro ao buscar funcionário. Por favor, tente novamente mais tarde.');
  }
};

module.exports = {
  cadastrarFuncionario,
  listarFuncionarios,
  buscarFuncionario
}