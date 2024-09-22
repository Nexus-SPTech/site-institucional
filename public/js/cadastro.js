const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function cadastrar() {
    const nomeVar = input_nome.value;
    const emailVar = input_email.value;
    const senhaVar = input_senha.value;
    const confirmacaoSenhaVar = input_confirmarSenha.value;
    const indice_arroba = emailVar.indexOf('@');
    const indice_ponto = emailVar.indexOf('.');

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {

        Swal.fire({
            title: "Não foi possível realizar o cadastro!",
            text: "Preencha todos os campos",
            icon: "error",
            color: "#FFF",
            confirmButtonColor: '#16a34a',
            background: "rgb(32, 32, 32)"
        });

        return false;
    } else if (indice_ponto <= 0 || indice_arroba <= 0) {
        Swal.fire({
            title: "Não foi possível realizar o cadastro!",
            text: "Seu email não é válido",
            icon: "error",
            color: "#FFF",
            confirmButtonColor: '#16a34a',
            background: "rgb(32, 32, 32)"
        });
    } else if (senhaVar.length <= 5) {
        Swal.fire({
            title: "Não foi possível realizar o cadastro!",
            text: "Sua senha precisa ter no mínimo 6 digitos",
            icon: "error",
            color: "#FFF",
            confirmButtonColor: '#16a34a',
            background: "rgb(32, 32, 32)"
        });
    } else if (senhaVar != confirmacaoSenhaVar) {
        Swal.fire({
            title: "Não foi possível realizar o cadastro!",
            text: "As senhas não coincidem",
            icon: "error",
            color: "#FFF",
            confirmButtonColor: '#16a34a',
            background: "rgb(32, 32, 32)"
        });
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
        }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                Swal.fire({
                    title: "Cadastro realizado!",
                    text: "Redirecionando para tela de login",
                    icon: "success",
                    color: "#FFF",
                    confirmButtonColor: '#16a34a',
                    background: "rgb(32, 32, 32)"
                });

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

let tentativas = 3;
function entrar() {

    const usuarioVar = input_usuarioLogin.value;
    const senhaVar = input_senhaLogin.value;

    if (usuarioVar == "" || senhaVar == "") {
        Swal.fire({
            title: "Não foi possível realizar o login!",
            text: "Preencha todos os campos",
            icon: "error",
            color: "#FFF",
            confirmButtonColor: '#16a34a',
            background: "rgb(32, 32, 32)"
        });

        return false;
    }
    else {
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

                    let timerInterval;
                    Swal.fire({
                        title: "Login Realizado!",
                        html: "Redirecionando para dashboard e,<b></b> millisegundos.",
                        icon: "success",
                        background: "rgb(32, 32, 32)",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                        setTimeout(function () {
                            window.location = "dash.html";
                        }, 5000); // apenas para exibir o loading
                    });

                });

            } else {
                for (var i = tentativas; i > 0; i--) {

                    console.log("Houve um erro ao tentar realizar o login!");
                    tentativas--;

                    i = tentativas;

                    Swal.fire({
                        title: "Não foi possível realizar o login!",
                        text: `Credenciais incorretas! tentativas restantes: ${i}`,
                        icon: "error",
                        color: "#FFF",
                        confirmButtonColor: '#16a34a',
                        background: "rgb(32, 32, 32)"
                    });

                    if (tentativas == 0) {

                        let timerInterval;
                        Swal.fire({
                            title: "Usuario bloqueado!",
                            html: "Voltando para home page em <b></b> millissegundo.",
                            timer: 2000,
                            timerProgressBar: true,
                            icon: "error",
                            background: "rgb(32, 32, 32)",
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                            setTimeout(function () {
                            }, 2000);
                            window.location.href = 'index.html';
                        });



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