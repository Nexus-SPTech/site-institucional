const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const userName = document.getElementById('name_user').innerHTML = sessionStorage.NOME_USUARIO;

const newUserRoleSelect = document.getElementById('new-role-select');
const newUserCompanySelect = document.getElementById('new-company-select');

const updateUserRoleSelect = document.getElementById('update-role-select');
const updateUserCompanySelect = document.getElementById('update-company-select');


function addUser() {
    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const password = document.getElementById('new-user-password').value;
    const role = newUserRoleSelect.value;
    const company = newUserCompanySelect.value;

    if (!name || !email || !password || !role || !company) {
        Swal.fire({
            title: "Erro ao adicionar o usuário!",
            text: "Preencha todos os campos",
            icon: "error"
        });
        return;
    }

    const user = {
        nomeUsuario: name,
        email: email,
        senha: password,
        idCargo: role,
        idEmpresa: company
    };

    fetch(`/usuarios/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(function (response) {
        if (response.status === 200) {
            Swal.fire({
                title: "Sucesso!",
                text: "Usuário adicionado com sucesso",
                icon: "success",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao adicionar usuário",
                icon: "error",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)"
            });
        }
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function getAll() {
    userTable.innerHTML = '';
    fetch(`/usuarios/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log("response: ", response);
        response.json().then(json => {
            json.forEach(user => {
                    const row = userTable.insertRow();
                    row.innerHTML = `
                    <td>${user.idUsuario}</td>
                    <td>${user.nomeUsuario}</td>
                    <td>${user.email}</td>
                    <td>${user.nomeCargo || 'Não definido'}</td>
                    <td>${user.nomeEmpresa || 'Não definida'}</td>
                    <td><a onclick="showUpdateModal('${user.idUsuario}', '${user.nomeUsuario}', '${user.email}', '${user.idCargo}', '${user.idEmpresa}')"><i class="fa-solid fa-pen"></i></a></td>
                    <td><a onclick="deleteUser(${user.idUsuario})"><i class="fa-solid fa-trash"></i></a></td>
                `;
            });
        })
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function getUserByName(nomeUsuario) {
    if (!nomeUsuario) {
        getAll();
        return;
    }

    fetch(`/usuarios/getByName/${nomeUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(users => {
            if (users.length > 0) {
                userTable.innerHTML = '';
                users.forEach(user => {
                        const row = userTable.insertRow();
                        row.innerHTML = `
                        <td>${user.idUsuario}</td>
                        <td>${user.nomeUsuario}</td>
                        <td>${user.email}</td>
                        <td>${user.nomeCargo || 'Não definido'}</td>
                        <td>${user.nomeEmpresa || 'Não definida'}</td>
                        <td><a onclick="showUpdateModal('${user.idUsuario}', '${user.nomeUsuario}', '${user.email}', '${user.idCargo}', '${user.idEmpresa}')"><i class="fa-solid fa-pen"></i></a></td>
                        <td><a onclick="deleteUser(${user.idUsuario})"><i class="fa-solid fa-trash"></i></a></td>
                    `;
                });
            } else {
                document.getElementById('error').innerHTML = "Usuário não encontrado";
            }
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function updateUser(event) {
    event.preventDefault();
    const idUsuario = document.getElementById('update-user-id').value;
    const name = document.getElementById('update-user-name').value;
    const email = document.getElementById('update-user-email').value;
    const role = document.getElementById('update-role-select').value;
    const company = document.getElementById('update-company-select').value;
    
    const user = {
        nomeUsuario: name,
        email: email,
        idCargo: role,
        idEmpresa: company
    };

    fetch(`/usuarios/update/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function (response) {
            if (response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Usuário editado com sucesso",
                    icon: "success",
                    confirmButtonColor: '#16a34a',
                    background: "rgb(32, 32, 32)"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                        getAll();
                    }
                });
            } else {
                Swal.fire({
                    title: "Erro!",
                    text: "Erro ao editar usuário",
                    icon: "error",
                    confirmButtonColor: '#16a34a',
                    background: "rgb(32, 32, 32)"
                });
            }
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function deleteUser(idUsuario) {
    Swal.fire({
        title: "Tem certeza que deseja deletar esse usuário?",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        cancelButtonColor: "#d33",
        background: "rgb(32, 32, 32)",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Não, cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deletado!",
                text: "Esse usuário foi deletado.",
                icon: "success",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)",
            });
            fetch(`/usuarios/delete/${idUsuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                getAll();
            }).catch(function (error) {
                console.log("error: ", error);
            });
        }
    });
}

function populateCompanies(callFrom) {
    fetch(`/empresas/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(json => {
            json.forEach(company => {
                const option = document.createElement('option');
                option.value = company.idEmpresa;
                option.innerHTML = company.nomeEmpresa;
                option.id = "update-user-company";
                callFrom == "add" ? newUserCompanySelect.appendChild(option) : updateUserCompanySelect.appendChild(option);
            });
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function populateRoles(callFrom) {
    fetch(`/cargos/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(json => {
            json.forEach(role => {
                const option = document.createElement('option');
                option.value = role.idCargo;
                option.innerHTML = role.nomeCargo;
                option.id = "update-user-role";
                callFrom == "add" ? newUserRoleSelect.appendChild(option) : updateUserRoleSelect.appendChild(option);
            });
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function showAddModal() {
    const modal = document.getElementById('add-modal');
    const callFrom = 'add';

    if (newUserCompanySelect.options.length === 1 && newUserRoleSelect.options.length === 1) {
        populateCompanies(callFrom);
        populateRoles(callFrom);
    }

    if (window.getComputedStyle(modal).display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function showUpdateModal(id, nome, email, cargo, empresa) {
    document.getElementById('update-user-id').setAttribute('value', id);
    document.getElementById('update-user-name').setAttribute('value', nome);
    document.getElementById('update-user-email').setAttribute('value', email);

    const roleSelect = document.getElementById("update-role-select");
    if (!cargo) {
        roleSelect.options[0].selected = true;
    } else {
        for (let option of roleSelect.options) {
            if (option.value === cargo) {
                option.selected = true;
                break;
            }
        }
    }

    const companySelect = document.getElementById("update-company-select");
    if (!empresa) {
        companySelect.options[0].selected = true;
    } else {
        for (let option of companySelect.options) {
            if (option.value === empresa) {
                option.selected = true;
                break;
            }
        }
    }

    const modal = document.getElementById('update-modal');
    const callFrom = 'update';

    if (updateUserCompanySelect.options.length === 1 && updateUserRoleSelect.options.length === 1) {
        populateCompanies(callFrom);
        populateRoles(callFrom);
    }

    if (window.getComputedStyle(modal).display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function sair() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}

getAll();