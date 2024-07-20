document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.save-button');
  
    saveButton.addEventListener('click', () => {
      const nome = document.getElementById('nome').value;
      const cpf = document.getElementById('cpf').value;
      const dataConsulta = document.getElementById('data-consulta').value;
  
      // Coletando horário de início
      const startHour = document.getElementById('startHour').value;
      const startMinute = document.getElementById('startMinute').value;
      const startPeriod = document.getElementById('startPeriod').value;
      const startTime = `${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')} ${startPeriod}`;
  
      // Coletando horário de término
      const endHour = document.getElementById('endHour').value;
      const endMinute = document.getElementById('endMinute').value;
      const endPeriod = document.getElementById('endPeriod').value;
      const endTime = `${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')} ${endPeriod}`;
  
      // Convertendo os horários para o formato de 24 horas e concatenando com a data
      const startDateTime = new Date(`${dataConsulta}T${convertTo24HourFormat(startTime)}`).toISOString();
      const endDateTime = new Date(`${dataConsulta}T${convertTo24HourFormat(endTime)}`).toISOString();
  
      if (!nome || !cpf || !dataConsulta) {
        alert('Nome, CPF e Data de consulta são obrigatórios');
        return;
      }
  
      fetch('http://localhost:3000/consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          cpf,
          telefone: '', // Você pode adicionar um campo para telefone se desejar
          dataConsulta: startDateTime, // Use o horário de início para o campo dataConsulta
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Consulta cadastrada:', data);
        alert('Consulta cadastrada com sucesso!');
        window.location.href = './agenda.html';
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar a consulta');
      });
    });
  
    // Função para converter o formato de 12 horas para 24 horas
    function convertTo24HourFormat(time) {
      const [timePart, period] = time.split(' ');
      let [hour, minute] = timePart.split(':').map(Number);
      
      if (period === 'PM' && hour < 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
  });
  