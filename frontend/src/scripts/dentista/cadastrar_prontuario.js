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
