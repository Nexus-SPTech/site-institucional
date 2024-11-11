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
    event.preventDefault();

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
        fetch("/usuarios/add", {
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
                }, "3000");

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

    event.preventDefault();
    const emailVar = input_emailLogin.value;
    const senhaVar = input_senhaLogin.value;

    if (emailVar == "" || senhaVar == "") {
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
        fetch("/usuarios/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.NOME_USUARIO = json.nomeUsuario;
                    sessionStorage.EMAIL_USUARIO = json.email;

                    let timerInterval;
                    Swal.fire({
                        title: "Login Realizado!",
                        html: "Redirecionando para dashboard em: <b></b> millisegundos.",
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
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                        setTimeout(function () {
                            window.location = "./dashboard/dashboard.html";
                        }, 500);
                    });

                });

            } else {
                for (var i = tentativas; i > 0; i--) {

                    console.log("Houve um erro ao tentar realizar o login!");
                    tentativas--;

                    // i = tentativas;
                    Swal.fire({
                        title: "Não foi possível realizar o login!",
                        text: `Credenciais incorretas! tentativas restantes: ${i - 1}`,
                        icon: "error",
                        color: "#FFF",
                        confirmButtonColor: '#16a34a',
                        background: "rgb(32, 32, 32)"
                    });

                    if (tentativas == 0) {

                        let timerInterval;
                        Swal.fire({
                            title: "Usuario bloqueado!",
                            html: "Voltando para página inicial em: <b></b> millissegundos.",
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
                            }, 500);
                            window.location.href = 'index.html';
                        });



                    }
                    break;
                }
            }
        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

}