var database = require("../database/config")


function authenticate(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, fkCargo FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function register(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoSql);
}

function getAllUsers() {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, fkCargo FROM usuario;
    `;
    return database.executar(instrucaoSql);
}

function getUserById(idUsuario) {
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, fkCargo FROM usuario WHERE idUsuario = '${idUsuario}';
    `;
    return database.executar(instrucaoSql);
}

function updateUser(idUsuario, nome, email, cargo) {
    var instrucaoSql = `
        UPDATE usuario SET nomeUsuario = '${nome}', email = '${email}, fkCargo = '${cargo}' WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function deleteUser(idUsuario) {
    var instrucaoSql = `
        DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    authenticate,
    register,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};