var database = require("../database/config")

function authenticate(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, fkCargo, deletado as isDeleted FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function add(nome, email, senha, idCargo, idEmpresa) {
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha, fkEmpresa, fkCargo) VALUES ('${nome}', '${email}', '${senha}', ${idEmpresa}, ${idCargo});
    `;
    return database.executar(instrucaoSql);
}

function getAllUsers() {
    var instrucaoSql = `
    SELECT idUsuario, nomeUsuario, email, usuario.deletado AS isDeletedUser, cargo.idCargo, cargo.nomeCargo, empresa.idEmpresa, empresa.nomeEmpresa, empresa.deletado AS isDeletedCompany FROM usuario
    LEFT JOIN cargo ON usuario.fkCargo = cargo.idCargo
    LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
    WHERE usuario.deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function getUserByName(nomeUsuario) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, usuario.deletado AS isDeletedUser, cargo.idCargo, cargo.nomeCargo, empresa.idEmpresa, empresa.nomeEmpresa, empresa.deletado AS isDeletedCompany FROM usuario
        LEFT JOIN cargo ON usuario.fkCargo = cargo.idCargo
        LEFT JOIN empresa ON usuario.fkEmpresa = empresa.idEmpresa
        WHERE nomeUsuario like "%${nomeUsuario}%" AND usuario.deletado = false;
    `;
    return database.executar(instrucaoSql);
}

function updateUser(idUsuario, nome, email, idCargo, idEmpresa) {
    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = '${nome}', email = '${email}', fkCargo = ${idCargo}, fkEmpresa = ${idEmpresa} WHERE idUsuario = ${idUsuario};
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
    add,
    getAllUsers,
    getUserByName,
    updateUser,
    deleteUser
};