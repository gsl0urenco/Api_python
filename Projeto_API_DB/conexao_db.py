#BIBLIOTECAS
import cx_Oracle
import json
from db import cnn
from flask import Flask, render_template,request,  jsonify

app = Flask(__name__)



#Função requisicao HTTP GET
@app.route('/', methods=['GET'])
def get():

    cep = request.args.get('cep')

    print(cep)
    # Cria a conexão
    connection = cx_Oracle.connect(user=cnn.username, password=cnn.password, dsn=cnn.dsn)

    # CURSOR PARA CONEXÃO
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM consul_end_correios WHERE cep = '{cep}'")

    rows = cursor.fetchall()

    if rows:
        # Criando uma lista
        dados = []

        # Recupera os dados do cursor
        for row in rows:
            record = {
                'codigo': row[0],
                'cep': row[1],
                'endereco': row[2],
                'bairro': row[3],
                'municipio': row[4],
                'uf': row[5]
            }

            # Adicionando os dados à lista
            dados.append(record)

        # Fecha o cursor e a conexão
        cursor.close()
        connection.close()

        json_data = json.dumps(dados)

        # Retorna os dados em JSON
        return json_data
   


@app.route('/post', methods=['POST'])
def inserir():
    data = request.get_json()

    cep = data['cep']
    endereco = data['endereco']
    bairro = data['bairro']
    municipio = data['municipio']
    uf = data['uf']

    # Cria a conexão
    connection = cx_Oracle.connect(user=cnn.username, password=cnn.password, dsn=cnn.dsn)

    # CURSOR PARA CONEXÃO
    cursor = connection.cursor()

    # Executa o comando SQL
    cursor.execute('INSERT INTO consul_end_correios(codigo, cep, endereco, bairro, municipio, uf) VALUES((SELECT NVL(MAX(CODIGO), 0) + 1 FROM consul_end_correios), :cep, :endereco, :bairro, :municipio, :uf)',
                   cep=cep, endereco=endereco, bairro=bairro, municipio=municipio, uf=uf)

    connection.commit()

    # Fecha o cursor e a conexão
    cursor.close()
    connection.close()

    response = {'message': 'Dados inseridos com sucesso'}
    return jsonify(response)
   

@app.route('/put', methods=['PUT'])
def update():

    data = request.get_json()

    cep = data['cep']
    endereco = data['endereco']
    bairro = data['bairro']
    municipio = data['municipio']
    uf = data['uf']
     
    connection = cx_Oracle.connect(user=cnn.username, password=cnn.password, dsn=cnn.dsn)

    # Cria a conexão
    cursor = connection.cursor()

    # Executa o comando SQL
    cursor.execute('UPDATE consul_end_correios SET cep = :cep,  endereco = :endereco, bairro = :bairro, municipio = :municipio, uf = :uf WHERE cep = :cep',  cep = cep, endereco = endereco, bairro = bairro, municipio = municipio, uf = uf) 
    
    #Realiza o commit no banco
    connection.commit()

    # Feche o cursor e a conexão
    cursor.close()
    connection.close()

    response = {'message': 'Dados alterados com sucesso'}
    return jsonify(response)



@app.route('/delete', methods=['DELETE'])
def deletar():

    data = request.get_json()

    cep = data['cep']
    
    connection = cx_Oracle.connect(user=cnn.username, password=cnn.password, dsn=cnn.dsn)

   # Cria a conexão
    cursor = connection.cursor()

    # Executa o comando SQL
    cursor.execute('DELETE consul_end_correios WHERE cep = :cep',  cep = cep) 
    
    #Realiza o commit no banco
    connection.commit()

    # Fecha o cursor e a conexão
    cursor.close()
    connection.close()

    response = {'message': 'Dados removidos com sucesso'}
    return jsonify(response)



#caso não retorne nenhum dado aparece a mensagem abaixo
#except cx_Oracle.DatabaseError as e:
    #print(f'Erro de banco de dados: {e}')


#Páginas HTML   

@app.route('/consultar')
def index():
    return render_template('index.html')

@app.route('/alterar')
def alt():
    return render_template('alterar.html')

@app.route('/deletar')
def dele():
    return render_template('deletar.html')

@app.route('/inserir')
def ins():
    return render_template('inserir.html')


if __name__ == '__main__':
    app.run()