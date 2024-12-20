const usuarioModel = require("../models/usuarioModel");

function authenticate(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.authenticate(email, senha)
            .then(
                function (resultadoAutenticar) {

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nomeUsuario: resultadoAutenticar[0].nomeUsuario,
                            nomeCargo: resultadoAutenticar[0].nomeCargo,
                            isDeleted: resultadoAutenticar[0].isDeleted,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function add(req, res) {
    let nome = req.body.nomeUsuario;
    let email = req.body.email;
    let senha = req.body.senha;
    let idCargo = req.body.idCargo;
    let idEmpresa = req.body.idEmpresa;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.add(nome, email, senha, idCargo, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function getAllUsers(req, res) {
    usuarioModel.getAllUsers()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os usuários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getUserByName(req, res) {
    var nomeUsuario = req.params.nomeUsuario;

    usuarioModel.getUserByName(nomeUsuario)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o usuário! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function updateUser(req, res) {
    var idUsuario = req.params.idUsuario;
    var nome = req.body.nomeUsuario;
    var email = req.body.email;
    var idCargo = req.body.idCargo;
    var idEmpresa = req.body.idEmpresa;

    usuarioModel.updateUser(idUsuario, nome, email, idCargo, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar o usuário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deleteUser(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.deleteUser(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao deletar o usuário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    authenticate,
    add,
    getAllUsers,
    getUserByName,
    updateUser,
    deleteUser
}