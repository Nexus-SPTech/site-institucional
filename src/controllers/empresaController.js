const empresaModel = require('../models/empresaModel');

function add(req, res) {
    var nomeEmpresa = req.body.nomeEmpresa;
    var cnpj = req.body.cnpj;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("cpnj está undefined!");
    } else {
        empresaModel.add(nomeEmpresa, cnpj)
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

    empresaModel.getCompanyByName(nomeEmpresa)
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
    const idEmpresa = req.params.idEmpresa;
    const nomeEmpresa = req.body.nomeEmpresa;
    const cnpj = req.body.cnpj;

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
    add,
    getAllCompanies,
    getByName,
    updateCompany,
    deleteCompany
}