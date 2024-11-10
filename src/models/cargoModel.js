var database = require("../database/config")

function getAllRoles() {
    var instrucaoSql = `
    SELECT * FROM cargo;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    getAllRoles
};