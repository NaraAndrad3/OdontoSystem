document.getElementById('paciente-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevenir o envio padrão do formulário

  const formData = new FormData(event.target);

  const pacienteData = {
      nome: formData.get('nome'),
      cpf: formData.get('cpf'),
      sexo: formData.get('sexo'),
      sus: formData.get('sus'),
      DataNascimento: formData.get('DataNascimento'),
      telefone: formData.get('telefone'),
      bairro: formData.get('bairro'),
      cidade: formData.get('cidade'),
      complemento: formData.get('complemento'),
      cep: formData.get('cep'),
      estado: formData.get('estado'),
      numero: formData.get('numero'),
      estadoCivil: formData.get('estadoCivil')
  };

  try {
      const response = await fetch('http://localhost:3000/paciente', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(pacienteData)
      });

      if (response.ok) {
          const result = await response.json();
          alert('Paciente cadastrado com sucesso!');
          window.location.href = './home.html'
      } else {
          const errorData = await response.json();
          alert(`Erro ao cadastrar paciente: ${errorData.error}`);
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
  }
});