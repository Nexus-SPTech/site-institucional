var database = require("../database/config")

function add(nomeCargo, descricao) {
    var instrucaoSql = `
        INSERT INTO cargo (nomeCargo, descricao) VALUES ('${nomeCargo}', '${descricao}');
    `;
    return database.executar(instrucaoSql);
}

function getAllRoles() {
    var instrucaoSql = `
        SELECT idCargo, nomeCargo, descricao, deletado AS isDeleted FROM cargo WHERE deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function getRoleByName(nomeCargo) {
    var instrucaoSql = `
        SELECT idCargo, nomeCargo, descricao, deletado AS 'isDeleted' FROM cargo WHERE nomeCargo like "%${nomeCargo}%" AND deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function updateRole(idCargo, nomeCargo, descricao) {
    var instrucaoSql = `
        UPDATE cargo SET nomeCargo = '${nomeCargo}', descricao = '${descricao}' WHERE idCargo = '${idCargo}';
    `;
    return database.executar(instrucaoSql);
}

function deleteRole(idCargo) {
    var instrucaoSql = `
        UPDATE cargo SET deletado = true WHERE idCargo = "${idCargo}";
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    add,
    getAllRoles,
    getRoleByName,
    updateRole,
    deleteRole
};