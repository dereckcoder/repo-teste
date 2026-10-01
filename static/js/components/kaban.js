/*
Resposavel por fazer o drop nas colunas do kaban 
E preparar para rota receber os dados
Envia para ROTA 
*/

export function atualizarkanban() {
    
    // Encontra o ID da pagina '.lead-card/.kanban-cards' -> painel_leads.hmlt
    const cards = document.querySelectorAll('.lead-card');
    const dropzones = document.querySelectorAll('.kanban-cards');
    
    // null -> nenhum valor
    let cardArrastado = null;

    // Captura os eventos de arrastar
    cards.forEach(card => {card.addEventListener('dragstart', 
        (e) => {cardArrastado = card;
        e.dataTransfer.setData('text/plain', card.dataset.id);
        });
    });
    
    // Configura as colunas para receberem o card
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Obrigatório para permitir o drop
        });
        
        zone.addEventListener('drop', async (e) => {
            e.preventDefault();
            
            if (cardArrastado) {
                // Move o card visualmente para a nova coluna no HTML
                zone.appendChild(cardArrastado);
                
                // Pega os dados para mandar pro Python
                const leadId = cardArrastado.dataset.id;
                // Pega o data-status da coluna
                const novoStatus = zone.dataset.status; 
                
                // Chama a função que faz o PUT
                await atualizarStatusLead(leadId, novoStatus);
            }
        });
    });
    
    // Faz a requisição PUT na rota 
    async function atualizarStatusLead(id, status) {
        try {
            // Rota -> para py
            const resposta = await fetch(`/api/leads/${id}/status`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ status: status })
            });
            
            if (resposta.ok) {
                console.log(`Lead ${id} atualizado para o status: ${status}`);
            } else {
                console.error('Erro ao atualizar no servidor.');
            }
        } catch (erro) {
            console.error('Erro de conexão:', erro);
        }
    } 
}
