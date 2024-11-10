const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const userName = document.getElementById('name_user');

userName.innerHTML = sessionStorage.NOME_USUARIO;

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
                    row.insertCell(5).innerHTML = `<a ><i class="fa-solid fa-pen"></i></a>`;
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
                        row.insertCell(5).innerHTML = `<a><i class="fa-solid fa-pen"></i></a>`;
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
            const companySelect = document.getElementById('company');
            json.forEach(company => {
                const option = document.createElement('option');
                option.value = company.idEmpresa;
                option.innerHTML = company.nomeEmpresa;
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
            const rolesSelect = document.getElementById('role');
            json.forEach(role => {
                const option = document.createElement('option');
                option.value = role.idCargo;
                option.innerHTML = role.nome;
                rolesSelect.appendChild(option);
            });
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function ShowAddUserForm() {
    document.getElementById('add-user-form').style.display = 'block';
    document.getElementById('show-form-button').style.display = 'none';
    document.getElementById('add-user-title').style.display = 'block';
    populateCompanies();
    populateRoles();
}

getAll();


