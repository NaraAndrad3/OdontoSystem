function goAgendarConsulta() {
    window.location.href = './agendar_consulta.html'
  }
  
  function createEvents() {
    prevDates = document.querySelectorAll('.prev-dates')
    prevDates.forEach(element => {
      element.addEventListener('click', async function() {
        await loadCalendar(this.id)
      })
    });
  
  
    nextDates = document.querySelectorAll('.next-dates')
    nextDates.forEach(element => {
      element.addEventListener('click', async function() {
        await loadCalendar(this.id)
      })
    });
  }
  
  
  async function loadCalendar(isoDate) {
    baseDate = new Date(isoDate)
  
    try {
      
      const response = await fetch('http://localhost:3000/agenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ date: baseDate }) // Converte o corpo para JSON
      });
  
      if(!response.ok){
        throw new Error()
      }
  
      const content = await response.json()
      const data = content.data
  
      console.log(content)
  
      letrasSemana = weekLetters(data.dayName)
  
      // atualizar mes e ano
      const mes = document.querySelector('.month')
      mes.innerHTML = `<span>${data.monthName}, ${data.year}</span>`
  
      // atualizar letras da semana na tela
      const weekdays = document.querySelector('.weekdays')
      weekdays.innerHTML = ''
  
      letrasSemana.forEach(letra => {
        const div = document.createElement('div');
        div.className = 'letra'; 
        div.textContent = letra; 
        weekdays.appendChild(div);
      });
  
      // Adicionar os numeros dos dias
      const numberWeekDays = document.querySelector('.dates')
      numberWeekDays.innerHTML = ''
  
      for (let i = 3; i > 0; i--) {
        const div = document.createElement('div');
        div.className = 'prev-dates'
        div.id = subtractDaysFromDate(baseDate, daysToSubtract=i)
        div.textContent = data.day - i  
        numberWeekDays.appendChild(div)    
      }
      
      const div = document.createElement('div')
      div.className = 'active-date'
      div.textContent = data.day
      div.id = addDaysFromDate(baseDate)
      numberWeekDays.appendChild(div)
      
      for (let i = 0; i < 3; i++) {
        const div = document.createElement('div');
        div.className = 'next-dates'
        div.textContent = data.day + i + 1
        div.id = addDaysFromDate(baseDate,daysToAdd=i+1)
        numberWeekDays.appendChild(div)    
      }
  
      loadClients(content.agendas)
  
      createEvents()
      
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
  }
  
  function loadClients(agendas) {
    console.log(agendas)
    const container = document.querySelector('.appointments')
    container.innerHTML = ''
    
    agendas.forEach(cliente => {
      const div = document.createElement('div')
  
      const data = new Date(cliente.dataConsulta)
      const hours = data.toLocaleString().split(', ')[1]
  
      div.className = 'appointment'
      div.innerHTML = `<div class="time">${hours}
                          </div>
                          <div class="details">
                              <span class="name">${cliente.nome}</span>
                              <span class="id">${cliente.cpf}</span>
                          </div>`
  
      container.appendChild(div)
    });
  }
  
  function subtractDaysFromDate(baseDate, daysToSubtract = 0) {
    const date = new Date(baseDate); // Converte a data base para um objeto Date
    date.setDate(date.getDate() - daysToSubtract); // Subtrai os dias
    return date.toISOString(); // Retorna a data no formato ISO 8601
  }
  
  function addDaysFromDate(baseDate, daysToAdd = 0) {
    const date = new Date(baseDate); // Converte a data base para um objeto Date
    date.setDate(date.getDate() + daysToAdd); // Adiciona os dias
    return date.toISOString(); // Retorna a data no formato ISO 8601
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const date = new Date(); // Cria um objeto Date com a data e hora atuais
    const isoString = date.toISOString();
  
    loadCalendar(isoString)
  })
  
  function weekLetters(actualDay) {
    if (actualDay == 'sábado') return ['Q','Q','S','S','D', 'S', 'T'];
    if (actualDay == 'domingo') return ['Q','S','S','D','S', 'T', 'Q'];
    if (actualDay == 'segunda-feira') return ['Q','Q','S','S','D', 'S', 'T'];
    if (actualDay == 'terça-feira') return ['Q','Q','S','S','D', 'S', 'T'];
    if (actualDay == 'quarta-feira') return ['Q','Q','S','S','D', 'S', 'T'];
    if (actualDay == 'quinta-feira') return ['Q','Q','S','S','D', 'S', 'T'];
    if (actualDay == 'sexta-feira') return ['Q','Q','S','S','D', 'S', 'T'];
  }