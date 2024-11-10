var database = require("../database/config")

function authenticate(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, fkCargo FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function register(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha, deletado) VALUES (deafult, '${nome}', '${email}', '${senha}', false);
    `;
    return database.executar(instrucaoSql);
}

function getAllUsers() {
    var instrucaoSql = `
    SELECT idUsuario, nomeUsuario, email, usuario.deletado AS isDeletedUser, cargo.nome AS nomeCargo, empresa.nomeEmpresa, empresa.deletado AS isDeletedCompany FROM usuario
    LEFT JOIN cargo ON usuario.fkCargo = cargo.idCargo
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa;
    `;
    return database.executar(instrucaoSql);
}

function getUserByName(nomeUsuario) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, usuario.deletado AS isDeletedUser, cargo.nome, empresa.nomeEmpresa, empresa.deletado AS isDeletedCompany FROM usuario
        LEFT JOIN cargo ON usuario.fkCargo = cargo.idCargo
        LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
        WHERE nomeUsuario like "%${nomeUsuario}%";
    `;
    return database.executar(instrucaoSql);
}

function updateUser(idUsuario, nome, email, cargo, empresa, isDeleted) {
    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = '${nome}', email = '${email}', fkCargo = '${cargo}', fkEmpresa = '${empresa}', deletado = ${isDeleted} WHERE idUsuario = '${idUsuario}';
    `;
    return database.executar(instrucaoSql);
}

function deleteUser(idUsuario) {
    var instrucaoSql = `
        UPDATE usuario SET deletado = true WHERE idUsuario = "${idUsuario}";
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    authenticate,
    register,
    getAllUsers,
    getUserByName,
    updateUser,
    deleteUser
};