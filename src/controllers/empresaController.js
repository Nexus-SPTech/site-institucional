const empresaModel = require('../models/empresaModel');

function register(req, res) {
    var nomeEmpresa = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        empresaModel.register(nomeEmpresa, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
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

function getAllCompanies(req, res) {
    empresaModel.getAllCompanies()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as empresas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getByName(req, res) {
    var nomeEmpresa = req.params.nomeEmpresa;

    empresaModel.getByName(nomeEmpresa)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao buscar a empresa! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function updateCompany(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var nomeEmpresa = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;

    empresaModel.updateCompany(idEmpresa, nomeEmpresa, cnpj)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar a empresa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deleteCompany(req, res) {
    var idEmpresa = req.params.idEmpresa;

    empresaModel.deleteCompany(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao deletar a empresa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    register,
    getAllCompanies,
    getByName,
    updateCompany,
    deleteCompany
}