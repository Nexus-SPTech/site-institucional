const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
 });

 sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");

});
function cadastrar(){
  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;
  var confirmacaoSenhaVar = input_confirmarSenha.value;
  var indice_arroba = emailVar.indexOf('@');
  var indice_ponto = emailVar.indexOf('.');


  if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" 
     
  ) {
   
         alert ("Todos os campos estão em branco");

     
      return false;
  }else if(indice_ponto <= 0 || indice_arroba <= 0){
alert("Seu email deve conter um @ e no minimo um '.'");
  } else if(senhaVar != confirmacaoSenhaVar){
alert("Senhas incompativeis");
  }else if(senhaVar.lenght <= 5){
    alert("Sua senha deve conter no minimo 6 digitos");
  }
  else {
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({

          nomeServer: nomeVar,
          emailServer: emailVar,
          senhaServer: senhaVar
      
         
      }),
  })
 
      .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
          
                 alert ("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

              setTimeout(() => {
                  window.location = "cadastro.html";
              }, "2000");

              limparFormulario();
             
          } else {
              throw "Houve um erro ao tentar realizar o cadastro!";
          }
      })
      .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
         
      });

  return false;
  }

 

}
var tentativas = 3;
function entrar(){
    
  var usuarioVar = input_usuarioLogin.value;
  var senhaVar = input_senhaLogin.value;
   
  if (usuarioVar == "" || senhaVar == "") {
      div_erro.style.display = "block"
      mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

      return false;
  }
  else {
      
  console.log("FORM LOGIN: ", usuarioVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          usuarioServer: usuarioVar,
          senhaServer: senhaVar
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
          console.log(resposta);

          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));
              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.ID_USUARIO = json.id;

              setTimeout(function () {
                  window.location = "dash.html";
              }, 1000); // apenas para exibir o loading

          });

      } else {
          for (var i = tentativas; i > 0; i--) {

              console.log("Houve um erro ao tentar realizar o login!");
              tentativas--;

              i = tentativas;

              alert(`Login incorreto. Tentativas restantes: ${i}`);

              if (tentativas == 0) {

                  alert("Você não tem mais tentativas.")
                  setTimeout(function() {
      sumirMensagem();
  }, 5000); 
                  window.location.href = 'index.html';
                  


              }
              break;
              resposta.text().then(texto => {
                  console.error(texto);

              });
          }
      }
  }).catch(function (erro) {
      console.log(erro);
  })

  return false;
  }

}

// Enviando o valor da nova input
