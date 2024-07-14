function goCadatrarDentista() {
  window.location.href = './cadastrar_dentista.html'
}


document.addEventListener('DOMContentLoaded', () => {
  let offset = 0;
  const limit = 10; // Número de dentistas a serem carregados por vez

  const containerDentistas = document.querySelector('.container-dentistas');
  const carregarMaisButton = document.getElementById('carregarMais');

  const carregarDentistas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/dentistas?offset=${offset}&limit=${limit}`);
      const dentistas = await response.json();

      dentistas.forEach(dentista => {
        const dentistaButton = document.createElement('button');
        dentistaButton.classList.add('dentista');

        const nomeDiv = document.createElement('div');
        nomeDiv.classList.add('nome-dentista');

        const img = document.createElement('img');
        img.src = "../../assets/person.png";
        img.alt = "Ícone";

        const nomeSpan = document.createElement('span');
        nomeSpan.id = "spanNome";
        nomeSpan.innerHTML = `<b>Nome:</b> ${dentista.nome}`;

        const cpfSpan = document.createElement('span');
        cpfSpan.id = "cpf";
        cpfSpan.innerHTML = `<b>CPF:</b> ${dentista.cpf}`;

        nomeDiv.appendChild(img);
        nomeDiv.appendChild(nomeSpan);

        dentistaButton.appendChild(nomeDiv);
        dentistaButton.appendChild(cpfSpan);

        containerDentistas.appendChild(dentistaButton);
      });

      // Atualiza o offset para carregar os próximos dentistas na próxima requisição
      offset += limit;

      // Se não houver mais dentistas para carregar, esconde o botão
      if (dentistas.length < limit) {
        carregarMaisButton.style.display = 'none';
      }
    } catch (error) {
      console.error('Erro ao carregar dentistas:', error);
    }
  };

  // Carrega os dentistas quando a página é carregada
  carregarDentistas();

  // Adiciona o evento de clique no botão "Carregar Mais"
  carregarMaisButton.addEventListener('click', carregarDentistas);
});


const btn_buscar = document.getElementById('lupa')

btn_buscar.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome_pessoa').value
  
  buscar(nome)

})

async function buscar(nome){
  try {
    const response = await fetch(`http://localhost:3000/buscarDentista?nome=${nome}`);
    const dentistas = await response.json();

    const containerDentistas = document.querySelector('.container-dentistas');

    containerDentistas.innerHTML = ""

    dentistas.forEach(dentista => {
      const dentistaButton = document.createElement('button');
      dentistaButton.classList.add('dentista');

      const nomeDiv = document.createElement('div');
      nomeDiv.classList.add('nome-dentista');

      const img = document.createElement('img');
      img.src = "../../assets/person.png";
      img.alt = "Ícone";

      const nomeSpan = document.createElement('span');
      nomeSpan.id = "spanNome";
      nomeSpan.innerHTML = `<b>Nome:</b> ${dentista.nome}`;

      const cpfSpan = document.createElement('span');
      cpfSpan.id = "cpf";
      cpfSpan.innerHTML = `<b>CPF:</b> ${dentista.cpf}`;

      nomeDiv.appendChild(img);
      nomeDiv.appendChild(nomeSpan);

      dentistaButton.appendChild(nomeDiv);
      dentistaButton.appendChild(cpfSpan);

      containerDentistas.appendChild(dentistaButton);
    });


  } catch (error) {
    console.error('Erro ao carregar pacientes:', error);
  }  
}