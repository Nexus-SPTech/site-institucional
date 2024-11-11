var database = require("../database/config")

function add(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

function getAllCompanies() {
    var instrucaoSql = `
    SELECT * FROM empresa;
    `;
    return database.executar(instrucaoSql);
}

function getCompanieByName(nomeEmpresa) {
    var instrucaoSql = `
        SELECT * FROM empresa WHERE nomeEmpresa like "%${nomeEmpresa}%";
    `;
    return database.executar(instrucaoSql);
}

function updateCompany(idEmpresa, nomeEmpresa, cpnj) {
    var instrucaoSql = `
        UPDATE empresa SET nomeEmpresa = '${nomeEmpresa}', cnpj = '${cpnj}' WHERE idEmpresa = "${idEmpresa}";
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
    getCompanieByName,
    updateCompany,
    deleteCompany
};