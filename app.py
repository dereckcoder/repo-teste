from flask import Flask, render_template,jsonify,request

# Chama as funções
from api.cliente import consultar_banco_completo,atualiza_banco_dados,get_encremento_id,enviar_dados_novos_banco

app = Flask(__name__) # transfere o Flask para app

# Rotas - endpoint
@app.route('/')
def home(): # rota index.html
    
    return render_template('index.html')

# rota -> painel de controle
@app.route('/painel-de-controle')
def painel_de_leads():
    
    # chama a funcao e consulta o banco completo
    lista_leads = consultar_banco_completo()
    
    # chama o teplate html e lista_leads
    return render_template('/painel_leads.html', lista_leads=lista_leads)

@app.route('/cadastro-gerais')
def cadastro_gerais():
        return render_template('cadastro_gerais.html')

# rota -> Atualizar status cliente - novo, pedente e perdido
@app.route('/api/leads/<int:lead_id>/status', methods=['PUT'])
def atualiza_status_cliente_banco(lead_id):
    try:
        # Recebe os dados (JS)
        dados = request.get_json()
        novo_status = dados.get('status') 

        if not novo_status:
            return jsonify({'erro': 'Status não fornecido'}), 400

        # Chama a função que atualiza no banco usando o ID e status
        sucesso = atualiza_banco_dados(lead_id, novo_status)

        if not sucesso:
            return jsonify({'erro': 'Lead não encontrado'}), 404

        return jsonify({'sucesso': True, 'mensagem': 'Status atualizado com sucesso!'}), 200

    except Exception as e:
        print(f"Erro na rota: {e}")
        return jsonify({'erro': 'Erro interno no servidor'}), 500

# rota -> cadastro de novos clientes no banco de dados
@app.route('/api/leads/criar', methods=['POST']) 
def criar_cliente():
    
    try:
        # Puxa -> dados -> JavaScript -> dados recebe
        dados = request.get_json() 

        # FALHA NO RECEBIMENTO
        if not dados:
            print("Tentativa de envio vazia!")
            return jsonify({"erro": "Nenhum dado foi recebido."}), 400
    
        # RECEBIMENTO(JS) COM SUCESSO 
        # Chama a funcao encremento ID
        id_novo = get_encremento_id()

        # Preparacao para o POST, Adiciona em um dicionario        
        novo_cliente = {
            "_id": id_novo,
            "status": dados.get("status", "NOVO"),
            "empresa": dados.get("empresa", ""),
            "nome": dados.get("nome", ""),
            "telefone": dados.get("telefone", ""),
            "email": dados.get("email", ""),
            "valor": dados.get("valor", 0),
            "vendedor": dados.get("vendedor", "")
        }
        # Envia para funcao resposavel por fazer envio para o banco
        reposta =  enviar_dados_novos_banco(novo_cliente)

        if reposta:
            print("Enviando com SUCESSO!")
        else:
            print("ERROR - ENVIO CADASTRO")

        # Retorna - OK -> envio pro banco -> messagem JavaScript
        return jsonify({"mensagem": "Lead recebido com sucesso!"}), 201

    except Exception as e: # Se a rota quebrar 
        print(f"Processo rota intera: {e}")
        return jsonify({"erro": "Erro no servidor."}), 500

if __name__ == "__main__":
   
    app.run(debug=True) # debug ativo na sessão


    