function preventSubmit(event) {
  event.preventDefault();
  
  const email = document.getElementById('email')

  console.log(email)

  if (email.value == "raglicia"){
    window.location.href = "../src/pages/recepcionista/home.html"
  }else if (email.value == 'nara'){
    window.location.href = "../src/pages/gerente/home.html"
  } else if (email.value = 'nara2') {
    window.location.href = "../src/pages/dentista/home.html"
  }

}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", preventSubmit);
});

// navegação das telas gerente
function irTelaPacientes() {
  window.location.href = "../gerente/cadastrar_cliente.html";
}

function irTelaAgendamento() {
  window.location.href = "../gerente/agenda.html";
}

function irTelaDentista() {
  window.location.href = "../gerente/dentista.html";
}

function irTelaFuncionario() {
  window.location.href = "../gerente/funcionario.html";
}

function irTelaCadastrarDentista() {
  window.location.href = "../recepcionista/cadastrar_dentista.html";
}

// navegação das telas dentista
function irTelaPacientesDentista() {
  window.location.href = "../dentista/Pacientes.html";
}

function irTelaProntuarioDentista() {
  window.location.href = "../dentista/prontuario_dentista.html";
}

function irTelaAgendaDentista() {
  window.location.href = "../dentista/agenda.html";
}

function irTelaCadastrarConsulta() {
  window.location.href = "../gerente/calendario.html";
}

function irTelaCriarProntuario() {
  window.location.href = "../dentista/prontuario.html";
}