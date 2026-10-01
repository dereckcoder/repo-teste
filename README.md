# CRM Leads 

objetivo....

# Estrutura

    CRM/
    ├── api/
    │   └── cliente.py
    └── static/
    |    ├── css/
    |    │   └── estilo.css
    |    └── js/
    |        └── components/
    |        │    ├──subs.js
    |        ├──main.js
    | 
    ├── templates/ 
    │   │    └── components/
    │   │             └── subs.html          
    │   ├──index.html
    │
    ├── app.py


# funcões

Na pasta API/ tem o clientes.py 

existe funções para fazer .get .post .put para o banco
e tambem existes funcções para veridicar o ultimo de ID 
e fazer o encremnti de ++1 no id para salvar no banco

pasta static -> está o .css

pasta templates ,hmtl princiapais -> components Subs -> hmtls

app.py raiz -> resposavel por ligar o servidor criar as rotas e receber dados do js
