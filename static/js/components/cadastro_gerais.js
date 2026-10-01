//Resposavel por caputrar os dados e preparar para rota

export function cadastro_gerais() {
    
    // Encontra o ID da pagina 'LeadForms' -> cadastro_gerais.hmlt
    const form = document.getElementById('leadForm');
     
    // 'submit' monitora os envents -> envio do formulário
    form.addEventListener('submit', async function(event) {
        
        event.preventDefault(); // Não deixa a página recarregar sozinha
        
        //  CAPTURA DOS DADOS -> this -> inputs pelo usuario
        const formData = new FormData(this); 
        const dados = Object.fromEntries(formData.entries()); 
       
        // enviamos a origin... 
        dados.origin = "formulario crm";

        // envia o alerta para o html exibir uma mensagem 
        const mensagemEl = document.getElementById('mensagem');
        if (mensagemEl) mensagemEl.innerText = "Salvando lead...";

        try {
            // Enviando para rota
            const resposta = await fetch('/api/leads/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Transforma o objeto {dados} final em texto JSON
                body: JSON.stringify(dados) 
            });

            if (resposta.ok) {
                console.log('Lead criado com sucesso!');
                
                if(mensagemEl) {
                    mensagemEl.innerText = "cadastrado com sucesso!";
                    mensagemEl.style.color = "#1cc88a";
                }

                form.reset(); // faz o resets nos inputs

            } else {
                console.error('Erro ao salvar no servidor.');
                alert('Erro ao salvar o lead. Tente novamente.');
                if (mensagemEl) mensagemEl.innerText = "";
            }
        } catch (erro) {
            console.error('Erro de conexão:', erro);
            alert('Erro de conexão com o servidor.');
            if (mensagemEl) mensagemEl.innerText = "";
        }
    });
}