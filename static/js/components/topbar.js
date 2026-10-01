// Abre e fecha o menu ao clicar Usuario

export function inicializarUserMenu() {
    
    const userMenu = document.getElementById('userMenu');
    const userTrigger = document.getElementById('userTrigger');

    if (!userMenu || !userTrigger) return;

        // Captura os eventos de arrastar
        userTrigger.addEventListener('click', (event) => {
            
            // Controla do clique 
            event.stopPropagation(); 
        
        // Importa a classe CSS
        const isOpen = userMenu.classList.toggle('open');
        userTrigger.setAttribute('aria-expanded', isOpen);
    });

    // Envento para fechar quando clicar fora do campo automaticamente
    document.addEventListener('click', (event) => {

        if (!userMenu.contains(event.target)) {

            userMenu.classList.remove('open');
            userTrigger.setAttribute('aria-expanded', 'false');
        }
    });
}