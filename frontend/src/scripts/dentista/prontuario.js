document.getElementById('prontuario-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevenir o envio padrão do formulário

  const formData = new FormData(event.target);

  const pacienteData = {
      anamnese: formData.get('anamnese'),
      historico_medico: formData.get('historico-medico'),
      historico_odontologico: formData.get('historico-odontologico'), // Corrigido de 'historico_odontologia'
      exame_clinico: formData.get('exame-clinico'),
      exame_complementar: formData.get('exames-complementares'),
      diagnostico: formData.get('diagnostico'),
      prescricao: formData.get('prescricao'),
      tratamento: formData.get('plano-tratamento'),
      observacoes: formData.get('observacoes'),
      dataConsulta: formData.get('data-consulta'), // Corrigido de 'data'
      horaConsulta: `${formData.get('hora-consulta-hora')}:${formData.get('hora-consulta-minuto')}`
  };

  try {
      const response = await fetch('http://localhost:3000/prontuario', { // Corrigida a URL
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(pacienteData)
      });

      if (response.ok) {
          const result = await response.json();
          alert('Prontuário cadastrado com sucesso!');
          window.location.href = './home.html';
      } else {
          const errorData = await response.json();
          alert(`Erro ao cadastrar prontuário: ${errorData.error}`);
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
  }
});



function limitInputLength(input, maxLength) {
  input.addEventListener('input', () => {
      if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
      }
  });
}

const hourInput = document.getElementById('hora-consulta-hora');
const minuteInput = document.getElementById('hora-consulta-minuto');

limitInputLength(hourInput, 2);
limitInputLength(minuteInput, 2);


const btnAm = document.getElementById('am')
const btnPm = document.getElementById('pm')


// remover evento padrão (submit) dos botoes de AM PM e ativar botão (botão selecionado)
btnAm.addEventListener('click', function(event) {
  event.preventDefault();
  
  btnPm.classList.remove('selected')
  btnPm.style.backgroundColor = 'transparent';
  btnPm.style.color = '#424242';
  
  this.classList.add('selected');
  this.style.backgroundColor = '#2196F3';
  this.style.color = 'white';
});

btnPm.addEventListener('click', function(event) {
  event.preventDefault();
  
  btnAm.classList.remove('selected')
  btnAm.style.backgroundColor = 'transparent';
  btnAm.style.color = '#424242';

  this.classList.add('selected');
  this.style.backgroundColor = '#2196F3';
  this.style.color = 'white';
});

