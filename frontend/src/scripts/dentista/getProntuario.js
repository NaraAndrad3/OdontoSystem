document.addEventListener('DOMContentLoaded', () => loadContentProntuario())

async function loadContentProntuario(){
    const taskData = JSON.parse(localStorage.getItem('taskData'));
    localStorage.clear();

    const data = await getProntuarioInfo(taskData.cpf)

    const paciente = data.paciente
    const prontuario = data.prontuario

    console.log(paciente)
    console.log(prontuario)

    const nome = document.getElementById('nome')
    nome.innerText = paciente.nome ? paciente.nome : ""; 

    const idade = document.getElementById('idade')
    
    if(paciente.DataNascimento){
        idade.innerText = calcularIdade(paciente.DataNascimento)
    }

    if (paciente.sexo) {
        const sexo = document.getElementById('sexo')
        sexo.innerText = paciente.sexo == 'M'? "Masculino": 'Feminino'; 
    }

    const endereco = document.getElementById('endereco')
    endereco.innerText = `${paciente.bairro}, ${paciente.cidade}`

    const cep = document.getElementById('cep')
    cep.innerText = paciente.cep.replace(/(\d{5})(\d{3})/, '$1-$2');

    const telefone = document.getElementById('telefone')
    telefone.innerText = paciente.telefone

    const cpf = document.getElementById('cpf')
    cpf.innerText = paciente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    if (prontuario.dataConsulta) {
        const dataConsulta = document.getElementById('dataConsulta')

        // Cria um objeto Date a partir da data ISO
        const dataConsult = new Date(prontuario.dataConsulta);
       
        // Obtém o dia, mês e ano
        const dia = String(dataConsult.getUTCDate()).padStart(2, '0');
        const mes = String(dataConsult.getUTCMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
        const ano = dataConsult.getUTCFullYear();
        
        // Formata a data como "dia/mês/ano"
        const dataFormatada = `${dia}/${mes}/${ano}`;
   
       dataConsulta.innerText = `Consulta dia ${dataFormatada}`           
    }

    const anamnese = document.getElementById('anamnese')
    anamnese.innerText = prontuario.anamnese ? prontuario.anamnese : ""; 

    const historico_med = document.getElementById('historico_medico')
    historico_med.innerText = prontuario.historico_medico ? prontuario.historico_medico : "";

    const historico_odont = document.getElementById('historico_odontologico')
    historico_odont.innerText = prontuario.historico_odontologico ? prontuario.historico_odontologico : "";

    const exame_cli = document.getElementById('exame_clinico')
    exame_cli.innerText = prontuario.exame_clinico ? prontuario.exame_clinico : "";
    
    const exame_comp = document.getElementById('exame_complementar')
    exame_comp.innerText = prontuario.exame_complementar ? prontuario.exame_complementar : "";

    const diagnostico = document.getElementById('diagnostico')
    diagnostico.innerText = prontuario.diagnostico ? prontuario.diagnostico : "";

    const tratamento = document.getElementById('tratamento')
    tratamento.innerText = prontuario.tratamento ? prontuario.tratamento : "";

    const prescricao = document.getElementById('prescricao')
    prescricao.innerText = prontuario.prescricao ? prontuario.prescricao : "";

    const observacoes = document.getElementById('observacoes')
    observacoes.innerText = prontuario.observacoes ? prontuario.observacoes : "";
}

function calcularIdade(dataNascimento) {
    // Cria um objeto Date com a data de nascimento
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
  
    // Calcula a diferença em anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
  
    // Se ainda não tiver feito aniversário este ano, subtrai um ano da idade
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
  
    return idade;
  }

async function getProntuarioInfo(cpf){
    const response = await fetch(`http://localhost:3000/prontuario/${cpf}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        alert(`Erro ao cadastrar prontuário: ${errorData.error}`);
    }else {
        const result = await response.json();
        return result
    }
}