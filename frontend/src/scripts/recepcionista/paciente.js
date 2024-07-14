function goCadatrarPaciente() {
    window.location.href = './cadastrar_paciente.html'
}

document.addEventListener('DOMContentLoaded', () => {
    let offset = 0;
    const limit = 10; // Número de pacientes a serem carregados por vez
  
    const containerPacientes = document.querySelector('.container-pacientes');
    const carregarMaisButton = document.getElementById('carregarMais');
  
    const carregarPacientes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pacientes?offset=${offset}&limit=${limit}`);
        const pacientes = await response.json();
  
        pacientes.forEach(paciente => {
          const pacienteButton = document.createElement('button');
          pacienteButton.classList.add('paciente');
  
          const nomeDiv = document.createElement('div');
          nomeDiv.classList.add('nome-paciente');
  
          const img = document.createElement('img');
          img.src = "../../assets/person.png";
          img.alt = "Ícone";
  
          const nomeSpan = document.createElement('span');
          nomeSpan.id = "spanNome";
          nomeSpan.innerHTML = `<b>Nome:</b> ${paciente.nome}`;
  
          const cpfSpan = document.createElement('span');
          cpfSpan.id = "cpf";
          cpfSpan.innerHTML = `<b>CPF:</b> ${paciente.cpf}`;
  
          nomeDiv.appendChild(img);
          nomeDiv.appendChild(nomeSpan);
  
          pacienteButton.appendChild(nomeDiv);
          pacienteButton.appendChild(cpfSpan);
  
          containerPacientes.appendChild(pacienteButton);
        });
  
        // Atualiza o offset para carregar os próximos pacientes na próxima requisição
        offset += limit;
  
        // Se não houver mais pacientes para carregar, esconde o botão
        if (pacientes.length < limit) {
          carregarMaisButton.style.display = 'none';
        }
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
      }
    };
  
    // Carrega os pacientes quando a página é carregada
    carregarPacientes();
  
    // Adiciona o evento de clique no botão "Carregar Mais"
    carregarMaisButton.addEventListener('click', carregarPacientes);
  });
  

const btn_buscar = document.getElementById('lupa')

btn_buscar.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome_pessoa').value
  
  buscar(nome)

})

async function buscar(nome){
  try {
    const response = await fetch(`http://localhost:3000/buscarPaciente?nome=${nome}`);
    const pacientes = await response.json();
   
    console.log(pacientes)

    const containerPacientes = document.querySelector('.container-pacientes');

    containerPacientes.innerHTML = ""

    pacientes.forEach(paciente => {
      const pacienteButton = document.createElement('button');
      pacienteButton.classList.add('paciente');

      const nomeDiv = document.createElement('div');
      nomeDiv.classList.add('nome-paciente');

      const img = document.createElement('img');
      img.src = "../../assets/person.png";
      img.alt = "Ícone";

      const nomeSpan = document.createElement('span');
      nomeSpan.id = "spanNome";
      nomeSpan.innerHTML = `<b>Nome:</b> ${paciente.nome}`;

      const cpfSpan = document.createElement('span');
      cpfSpan.id = "cpf";
      cpfSpan.innerHTML = `<b>CPF:</b> ${paciente.cpf}`;

      nomeDiv.appendChild(img);
      nomeDiv.appendChild(nomeSpan);

      pacienteButton.appendChild(nomeDiv);
      pacienteButton.appendChild(cpfSpan);

      containerPacientes.appendChild(pacienteButton);
    });



  } catch (error) {
    console.error('Erro ao carregar pacientes:', error);
  }  
}