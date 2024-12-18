var database = require("../database/config")

function add(nomeEmpresa, cpnj) {
    var instrucaoSql = `
        INSERT INTO empresa (nomeEmpresa, cnpj) VALUES ('${nomeEmpresa}', '${cpnj}');
    `;
    return database.executar(instrucaoSql);
}

function getAllCompanies() {
    var instrucaoSql = `
    SELECT idEmpresa, nomeEmpresa, cnpj, deletado AS 'isDeleted' FROM empresa WHERE deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function getCompanyByName(nomeEmpresa) {
    var instrucaoSql = `
        SELECT idEmpresa, nomeEmpresa, cnpj, deletado AS 'isDeleted' FROM empresa WHERE nomeEmpresa like "%${nomeEmpresa}%" AND deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function updateCompany(idEmpresa, nomeEmpresa, cpnj) {
    var instrucaoSql = `
        UPDATE empresa SET nomeEmpresa = '${nomeEmpresa}', cnpj = '${cpnj}' WHERE idEmpresa = '${idEmpresa}';
    `;
    return database.executar(instrucaoSql);
}

function deleteCompany(idEmpresa) {
    var instrucaoSql = `
        UPDATE empresa SET deletado = true WHERE idEmpresa = "${idEmpresa}";
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    add,
    getAllCompanies,
    getCompanyByName,
    updateCompany,
    deleteCompany
};