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

