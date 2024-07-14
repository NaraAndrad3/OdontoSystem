document.getElementById('dentista-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Captura dos valores do formulário
  const formData = new FormData(this);

  // Montagem do objeto de dados a ser enviado
  const dadosDentista = {
    nome: formData.get('name'),
    sexo: formData.get('gender'),
    estadoCivil: formData.get('marital-status'),
    dataNascimento: formData.get('dob'),
    telefoneCelular: formData.get('phone'),
    cpf: formData.get('cpf'),
    cartaoSUS: formData.get('sus-card'),
    bairro: formData.get('neighborhood'),
    cidade: formData.get('city'),
    complemento: formData.get('address-complement'),
    cep: formData.get('cep'),
    estado: formData.get('state'),
    numero: formData.get('number'),
    especialidade: formData.get('especialidade'),
    numeroInscricao: formData.get('inscricao'),
    horarioInicio: `${formData.get('startHour')}:${formData.get('startMinute')} ${formData.get('startPeriod')}`,
    horarioFim: `${formData.get('endHour')}:${formData.get('endMinute')} ${formData.get('endPeriod')}`,
    documentoIdentificacao: '/caminho/do/arquivo/documento.pdf' // Aqui você precisa implementar a lógica para enviar o arquivo real
  };

  // URL da sua rota de cadastro de dentista
  const url = 'http://localhost:3000/dentista';

  try {
    // Envia a requisição POST com os dados do dentista
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosDentista)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar dentista.');
    }

    const responseData = await response.json();
    console.log('Dentista cadastrado com sucesso:', responseData);
    alert('Dentista cadastrado com sucesso!');
    // Aqui você pode redirecionar o usuário ou fazer outra ação após o cadastro
  } catch (error) {
    console.error('Erro ao cadastrar dentista:', error);
    alert('Erro ao cadastrar dentista. Verifique os dados e tente novamente.');
  }
});
