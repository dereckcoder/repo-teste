// importamos os modulos do js para -> main.js  -> orquestrador

import { inicializarUserMenu } from './components/topbar.js';

import { inicializarSidebarToggle } from './components/sidebar.js'; 

import { atualizarkanban } from './components/kaban.js'; 

import { cadastro_gerais } from './components/cadastro_gerais.js'; 

document.addEventListener('DOMContentLoaded', () => {

    inicializarUserMenu();
    
    inicializarSidebarToggle();
    
    atualizarkanban();

    cadastro_gerais();

});

