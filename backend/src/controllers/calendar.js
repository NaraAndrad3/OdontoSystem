const {DateTime} = require('luxon')
const Agenda = require('../models/agenda')
const { Op, fn, col } = require('sequelize');

const getWeek = async (req, res) => {
    try {

        const date = req.body.date;

        // Converte a data recebida para um objeto DateTime do Luxon
        const timeZone = 'America/Sao_Paulo';
        const dateTime = DateTime.fromISO(date, { zone: timeZone });

        // Obtém as informações da data
        const month = dateTime.month
        const day = dateTime.day;
        const monthName = dateTime.toLocaleString({ month: 'long' });
        const year = dateTime.year;
        const dayName = dateTime.toLocaleString({ weekday: 'long' });
        
        const data = {
            day,
            monthName,
            year,
            dayName
        }
        
        // Define o início e o fim do dia
        const startOfDay = dateTime.startOf('day').toISO();
        const endOfDay = dateTime.endOf('day').toISO();

        // Consulta ao Sequelize para buscar elementos que correspondem ao intervalo de data enviado
        const agendas = await Agenda.findAll({
            where: {
                dataConsulta: {
                [Op.between]: [startOfDay, endOfDay]
                }
            }
        });
        
        res.status(200).json({ data, agendas });
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Erro inesperado"});
    }
}


// Rota para cadastrar uma nova consulta
const criarConsulta = async (req, res) => {
    const { nome, cpf, telefone, dataConsulta } = req.body;
  
    if (!nome || !cpf || !dataConsulta) {
      return res.status(400).json({ error: 'Nome, CPF e Data da Consulta são obrigatórios' });
    }
  
    try {
      const novaConsulta = await Agenda.create({
        nome,
        cpf,
        telefone,
        dataConsulta
      });
  
      res.status(201).json(novaConsulta);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao cadastrar a consulta' });
    }
};

module.exports = {
    getWeek,
    criarConsulta
}