const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const userName = document.getElementById('name_user');
const rolesSelect = document.getElementById('role');
const companySelect = document.getElementById('company');
userName.innerHTML = sessionStorage.NOME_USUARIO;

function addUser() {
    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const password = document.getElementById('new-user-password').value;
    const role = document.getElementById('new-user-role').value;
    const company = document.getElementById('new-user-company').value;

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
                icon: "success"
            });
            getAll();
            document.getElementById('add-user-form').style.display = 'none';
            document.getElementById('show-form-button').style.display = 'block';
            document.getElementById('add-user-title').style.display = 'none';
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao adicionar usuário",
                icon: "error"
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
                if (!user.isDeletedUser) {
                    const row = userTable.insertRow();
                    row.insertCell(0).innerHTML = user.idUsuario;
                    row.insertCell(1).innerHTML = user.nomeUsuario;
                    row.insertCell(2).innerHTML = user.email;
                    row.insertCell(3).innerHTML = user.nomeCargo == undefined ? 'Não definido' : user.nomeCargo;
                    row.insertCell(4).innerHTML = user.nomeEmpresa == undefined || user.isDeletedCompany ? 'Não definida' : user.nomeEmpresa;
                    row.insertCell(5).innerHTML = `<a onclick="showUpdateModal()"><i class="fa-solid fa-pen"></i></a>`;
                    row.insertCell(6).innerHTML = `<a onclick="deleteUser(${user.idUsuario})"><i class="fa-solid fa-trash"></i></a>`;
                }
            });
        })
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function getUserByName(nomeUsuario) {
    if (!nomeUsuario) {
        document.getElementById('error').innerHTML = "O campo de busca não pode estar vazio";
        getAll();
        return;
    }

    fetch(`/usuarios/getByName/${nomeUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(json => {
            if (json.length > 0) {
                userTable.innerHTML = '';
                json.forEach(user => {
                    if (!user.isDeletedUser) {
                        const row = userTable.insertRow();
                        row.insertCell(0).innerHTML = user.idUsuario;
                        row.insertCell(1).innerHTML = user.nomeUsuario;
                        row.insertCell(2).innerHTML = user.email;
                        row.insertCell(3).innerHTML = user.nomeCargo == undefined ? 'Não definido' : user.nomeCargo;
                        row.insertCell(4).innerHTML = user.nomeEmpresa == undefined ? 'Não definida' : user.nomeEmpresa;
                        row.insertCell(5).innerHTML = `<a onclick="showUpdateModal(user.nomeUsuario, user.email, user.nomeCargo, user.nomeEmpresa)"><i class="fa-solid fa-pen"></i></a>`;
                        row.insertCell(6).innerHTML = `<a onclick="deleteUser(${user.idUsuario})"><i class="fa-solid fa-trash"></i></a>`;
                    } else {
                        document.getElementById('error').innerHTML = "Usuário não encontrado";
                    }
                });
            } else {
                document.getElementById('error').innerHTML = "Usuário não encontrado";
            }
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function updateUser(idUsuario) {
    const name = document.getElementById('update-user-name').value;
    const email = document.getElementById('update-user-email').value;
    const role = document.getElementById('update-user-role').value;
    const company = document.getElementById('update-user-company').value;

    if (!name || !email || !role || !company) {
        Swal.fire({
            title: "Erro ao atualizar o usuário!",
            text: "Preencha todos os campos",
            icon: "error"
        });
        return;
    }

    const user = {
        idUsuario: idUsuario,
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
    }).then(function (response) {
        if (response.status === 200) {
            Swal.fire({
                title: "Sucesso!",
                text: "Usuário atualizado com sucesso",
                icon: "success"
            });
            getAll();
            document.getElementById('add-user-form').style.display = 'none';
            document.getElementById('show-form-button').style.display = 'block';
            document.getElementById('add-user-title').style.display = 'none';
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao atualizar usuário",
                icon: "error"
            });
        }
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function deleteUser(idUsuario) {
    Swal.fire({
        title: "Tem certeza que deseja deletar esse usuário?",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Não, cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deletado!",
                text: "Esse usuário foi deletado.",
                icon: "success"
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

function populateCompanies() {
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
                companySelect.appendChild(option);
            });
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function populateRoles() {
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
                rolesSelect.appendChild(option);
            });
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function showAddModal() {
    const modal = document.getElementById('add-modal');

    if (rolesSelect.options.length === 1 && companySelect.options.length === 1) {
        populateCompanies();
        populateRoles();
        companySelect.options.selectedIndex = 0;
        rolesSelect.options.selectedIndex = 0;
    }

    if (modal.style.display === "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function showUpdateModal(nome, email, cargo, empresa) {
    document.getElementById('update-user-name').setAttribute('value', nome);
    document.getElementById('update-user-email').setAttribute('value', email);
    document.getElementById('update-user-role').setAttribute('value', cargo);
    document.getElementById('update-user-company').setAttribute('value', empresa);
    const modal = document.getElementById('update-modal');

    if (rolesSelect.options.length === 1) {
        populateCompanies();
        populateRoles();
    }

    if (modal.style.display === "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

getAll();