// Resposavel por recolher o sidebar ->animação

export function inicializarSidebarToggle() {

    // Encontra o ID da pagina 'btn-toggle/sidebar' -> sidebar.hmlt
    const btnToggle = document.getElementById('btn-toggle');
    const sidebar = document.getElementById('sidebar');

    // evento ao clicar na parte do sidebar
    btnToggle.addEventListener('click', () => {
  
        // classe no .css para o sidebar ficar recolhido
        sidebar.classList.toggle('escondido'); 
    });
    
}