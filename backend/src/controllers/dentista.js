const Dentista = require('../models/dentista'); // Importe o modelo Dentista
const Sequelize = require('sequelize')

// Rota para cadastrar um novo dentista
const cadastrarDentista = async (req, res) => {
  try {
    const {
      nome,
      sexo,
      estadoCivil,
      dataNascimento,
      telefoneCelular,
      cpf,
      cartaoSUS,
      bairro,
      cidade,
      complemento,
      cep,
      estado,
      numero,
      especialidade,
      documentoIdentificacao,
      numeroInscricao,
      horarioInicio,
      horarioFim
    } = req.body;

    // Salvar no banco de dados usando o modelo Dentista
    const novoDentista = await Dentista.create({
      nome,
      sexo,
      estadoCivil,
      dataNascimento,
      telefoneCelular,
      cpf,
      cartaoSUS,
      bairro,
      cidade,
      complemento,
      cep,
      estado,
      numero,
      especialidade,
      numeroInscricao,
      documentoIdentificacao,
      horarioInicio,
      horarioFim
    });

    res.status(201).json({ message: 'Dentista cadastrado com sucesso', dentista: novoDentista });
  } catch (err) {
    console.error('Erro ao cadastrar dentista:', err);
    res.status(500).json({ error: 'Erro ao cadastrar dentista' });
  }
};

const listarDentistas = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const dentistas = await Dentista.findAll({
      attributes: ['nome', 'cpf'],
      offset: offset,
      limit: limit
    });
    res.status(200).json(dentistas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const buscarDentista = async (req, res) => {
  const { nome } = req.query;

  try {
      const dentistasEncontrados = await Dentista.findAll({
          where: {
              nome: {
                  [Sequelize.Op.like]: `%${nome}%`
              }
          }
      });
      
      res.status(200).json(dentistasEncontrados);
      
  } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      res.status(500).send('Erro ao buscar paciente. Por favor, tente novamente mais tarde.');
  }
};


module.exports = {cadastrarDentista, listarDentistas, buscarDentista};