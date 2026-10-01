from pymongo import MongoClient,DESCENDING
from bson.objectid import ObjectId


#### CHAVE BANCO ####

### -------------------- ###


"""
consultar_banco_completo
Puxa o banco completo
"""
def consultar_banco_completo():
    
    dados_banco = list(leads_collection.find())

    return dados_banco

"""
validacao_ultimo_id_banco
Filtra o ultimo ID no banco de dados
"""
def validacao_ultimo_id_banco():

    validacao_id = leads_collection.find_one(filter={},sort=[("_id",DESCENDING)])
    print(validacao_id)

    return validacao_id

'''
get_incremento_id
liga para banco, busca o ultimo ID
faz um ++encremento em uma variavel
'''
def get_encremento_id(): # Puxa o ultimo ID -> banco faz o encremento em NEW ID

    validacao_id = leads_collection.find_one(filter={},sort=[("_id",DESCENDING)])
    banco_id = validacao_id.get("_id")
    id_incremento = banco_id

    if banco_id == id_incremento:

        id_incremento += 1
        print(id_incremento)
        
    else:
        print("VALIDAÇÃO BANCO - ID - SUCESSO!")

    return id_incremento

'''
atualiza_banco_dados 
PUT - atualizar dados do banco
Recebe o ID registrado no banco e o
status escolhido para NOVO,PEDENTE
Atualiza CARDS kaban
'''
def atualiza_banco_dados(lead_id, novo_status): # Parametro tem que receber (js -> api -> py -> funcao)
    
    resultado = leads_collection.update_one({'_id': lead_id},{'$set': {'status': novo_status}})
    
    if resultado.matched_count == 0:
        print(f"AVISO: Nenhum lead encontrado com o ID {lead_id}")
        return False

    print(f"SUCESSO: Lead {lead_id} atualizado para o status '{novo_status}'!")
    return True

"""
enviar_dados_novos_banco
Função envia pelo metodo POST
os new cadastro clientes 
"""
def enviar_dados_novos_banco(dados): # Parametro tem que receber (js -> api -> py -> funcao)

    try:
        envio_unico = leads_collection.insert_one(dados)

    except:
        print("FALHA NO ENVIO")
   
    