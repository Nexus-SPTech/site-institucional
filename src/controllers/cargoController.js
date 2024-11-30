const cargoModel = require('../models/cargoModel');

function add(req, res) {
    var nomeCargo = req.body.nomeCargo;
    var descricao = req.body.descricao;

    if (nomeCargo == undefined) {
        res.status(400).send("nomeCargo está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("descricao está undefined!");
    } else {
        cargoModel.add(nomeCargo, descricao)
            .then(
                (resultado) => {
                    res.json(resultado);
                }
            ).catch(
                (erro) => {
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

function getAllRoles(req, res) {
    cargoModel.getAllRoles()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os cargos! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getRoleByName(req, res) {
    var nomeCargo = req.params.nomeCargo;

    cargoModel.getRoleByName(nomeCargo)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o cargo! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function updateRole(req, res) {
    const idCargo = req.params.idCargo;
    const nomeCargo = req.body.nomeCargo;
    const descricao = req.body.descricao;

    cargoModel.updateRole(idCargo, nomeCargo, descricao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar o cargo! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deleteRole(req, res) {
    var idCargo = req.params.idCargo;

    cargoModel.deleteRole(idCargo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao deletar o cargo! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    add,
    getAllRoles,
    getRoleByName,
    updateRole,
    deleteRole
}