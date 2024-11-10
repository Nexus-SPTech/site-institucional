const cargoModel = require('../models/cargoModel');

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

module.exports = {
    getAllRoles
};
