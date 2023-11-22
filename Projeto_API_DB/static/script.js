  /* METODO GET API*/
function apiGet() {
  
    document.getElementById('cepForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var cep = document.getElementById('cep').value;
        var url = 'http://127.0.0.1:5000/?cep=' + cep;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('CEP Não Cadastrado. Verifique o CEP digitado.');
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var cepDigitado = data[0].cep
                if (cepDigitado = cep){
                    var endereco = document.getElementById('endereco');

                    
                    console.log(cepDigitado)
            
                    var enderecoHTML = `
                        <div class="endereco-container">
                            <p>CEP: ${data[0].cep}</p>
                            <p>Endereco: ${data[0].endereco}</p>
                            <p>Bairro: ${data[0].bairro}</p>
                            <p>Cidade: ${data[0].municipio}</p>
                            <p>Estado: ${data[0].uf}</p>
                        </div>
                    `;

                    endereco.innerHTML = enderecoHTML;
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error.message);
            });
    });

 
}

  /* METODO POST API*/
function enviarCEP() {

        var cep = document.getElementById('cepIp').value;
        var endereco = document.getElementById('endereco').value;
        var bairro = document.getElementById('bairro').value;
        var municipio = document.getElementById('municipio').value;
        var uf = document.getElementById('ufIp').value;

  
        var dados = {
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            municipio: municipio,
            uf: uf
          };
          

          var json_data = JSON.stringify(dados);
          console.log(json_data)

          apiPost = 'http://127.0.0.1:5000/post'
          fetch(apiPost, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json_data
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert('Endereço Gravado com Sucesso!!')
            window.location.reload()
          })
          .catch(error => {
            console.error('Erro:', error);
          });
}

/*MÉTODO Delete*/
function deletarCep(){
    var cep = document.getElementById('cep').value;

    var dados = {
      cep: cep
    };

    var json_data = JSON.stringify(dados);

    apiPost = 'http://127.0.0.1:5000/delete'
          fetch(apiPost, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json_data
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert('CEP deletado com Sucesso!!')
            window.location.reload()
          })
          .catch(error => {
            console.error('Erro:', error);
          });

}


/* METODO GET/PUT*/
  function apiGetPut() {
  
    document.getElementById('cepForm').addEventListener('submit', function (event) {
      event.preventDefault();
      var cep = document.getElementById('cep').value;
      var url = 'http://127.0.0.1:5000/?cep=' + cep;

      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('CEP Não Cadastrado. Verifique o CEP digitado.');
              }
              return response.json();
          })
          .then(function (data) {
              console.log(data);

              var cepDigitado = data[0].cep
              if (cepDigitado = cep){

                  var cep1 = document.getElementById('cep1')
                  var end = document.getElementById('endereco')
                  var bair = document.getElementById('bairro')
                  var uf = document.getElementById('uf')
                  var mun = document.getElementById('municipio')
            
                  
                  console.log(cepDigitado)

                  cep1.value = data[0].cep
                  end.value = data[0].endereco
                  bair.value = data[0].bairro
                  uf.value = data[0].uf
                  mun.value = data[0].municipio

              }
          })
          .catch(function (error) {
              console.log(error);
              alert(error.message);
          });
  });

};


function alterarCep(){

    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;
    var bairro = document.getElementById('bairro').value;
    var uf = document.getElementById('uf').value;
    var municipio = document.getElementById('municipio').value;

      var dados = {
        cep: cep,
        endereco: endereco,
        bairro: bairro,
        municipio: municipio,
        uf: uf
      };

  var json_data = JSON.stringify(dados);

  apiPost = 'http://127.0.0.1:5000/put'
        fetch(apiPost, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json_data
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert('CEP Alterado com Sucesso!!')
          window.location.reload()
        })
        .catch(error => {
          console.error('Erro:', error);
        });

 
    }
