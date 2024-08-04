const Dentista = require('../models/dentista'); // Importe o modelo Dentista
const Pacientes = require('../models/paciente')
const Prontuario = require('../models/prontuario')
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

// Teste 50: controlador prontuário
const inserirProntuario = async (req, res) => {
  try {
    const {
      anamnese,
      historico_medico,
      historico_odontologico,
      exame_clinico,
      exame_complementar,
      diagnostico,
      prescricao,
      tratamento,
      observacoes,
      cpf,
      dataConsulta,
      horaConsulta
    } = req.body;

    console.log(req.body);

    const NovoProntuario = await Prontuario.create({
      anamnese,
      historico_medico,
      historico_odontologico,
      exame_clinico,
      exame_complementar,
      diagnostico,
      prescricao,
      tratamento,
      observacoes,
      cpf,
      dataConsulta,
      horaConsulta
    });

    res.status(201).json({ message: 'Prontuário cadastrado com sucesso', prontuario: NovoProntuario });
  } catch (err) {
    console.error('Erro ao cadastrar prontuário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar prontuário' });
  }
};

const buscarProntuarioPorCPF = async (req, res) => {
  try {
    const { cpf } = req.params;

    console.log(cpf);

    // Buscar prontuário pelo CPF
    const prontuario = await Prontuario.findOne({ where: { cpf } });

    if (!prontuario) {
      return res.status(404).json({ error: 'Prontuário não encontrado' });
    }

    // Buscar dados do paciente pelo CPF
    const paciente = await Pacientes.findOne({ where: { cpf } });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.status(200).json({ prontuario, paciente });
  } catch (err) {
    console.error('Erro ao buscar prontuário:', err);
    res.status(500).json({ error: 'Erro ao buscar prontuário' });
  }
};

module.exports = {cadastrarDentista, listarDentistas, buscarDentista, inserirProntuario, buscarProntuarioPorCPF};