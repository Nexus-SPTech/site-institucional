document.getElementById('name_user').innerHTML = sessionStorage.NOME_USUARIO;
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

function addRole() {
    const name = document.getElementById('new-role-name').value;
    const description = document.getElementById('new-role-description').value;

    if (!name || !description) {
        Swal.fire({
            title: "Erro ao adicionar o cargo!",
            text: "Preencha todos os campos",
            icon: "error"
        });
        return;
    }

    const role = {
        nomeCargo: name,
        descricao: description,
    };

    fetch(`/cargos/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(role)
    }).then(response => {
        if (response.status === 200) {

            Swal.fire({
                title: "Sucesso!",
                text: "Cargo adicionado com sucesso",
                icon: "success",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)"
            }).then(result => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Erro ao adicionar cargo",
                icon: "error",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)"
            });
        }
    }).catch(error => {
        console.log("error: ", error);
    });
}

function getAll() {
    userTable.innerHTML = '';
    fetch(`/cargos/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        response.json().then(json => {
            json.forEach(role => {
                const row = userTable.insertRow();
                row.innerHTML = `
                    <td>${role.idCargo}</td>
                    <td>${role.nomeCargo}</td>
                    <td>${role.descricao}</td>
                    <td><a onclick="showUpdateModal('${role.idCargo}', '${role.nomeCargo}', '${role.descricao}')"><i class="fa-solid fa-pen"></i></a></td>
                    <td><a onclick="deleteRole(${role.idCargo})"><i class="fa-solid fa-trash"></i></a></td>
                `;
            });
        })
    }).catch(error => {
        console.log("error: ", error);
    });

    setTimeout(() => {
        document.getElementById('error').innerHTML = "";
    }, 1000);
}

function getRoleByName(nomeCargo) {
    if (!nomeCargo) {
        getAll();
        return;
    }

    fetch(`/cargos/getByName/${nomeCargo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        response.json().then(json => {
            if (json.length > 0) {
                userTable.innerHTML = '';
                json.forEach(role => {
                    const row = userTable.insertRow();
                    row.innerHTML = `
                        <td>${role.idCargo}</td>
                        <td>${role.nomeCargo}</td>
                        <td>${role.descricao}</td>
                        <td><a onclick="showUpdateModal('${role.idCargo}', '${role.nomeCargo}', '${role.descricao}')"><i class="fa-solid fa-pen"></i></a></td>
                        <td><a onclick="deleteRole(${role.idCargo})"><i class="fa-solid fa-trash"></i></a></td>
                    `;
                });
            } else {
                document.getElementById('error').innerHTML = "Cargo não encontrado";
                getAll();
            }
        });
    }).catch(error => {
        console.log("error: ", error);
    });
}

function updateRole(event) {
    event.preventDefault();
    const idCargo = document.getElementById('update-role-id').value;
    const name = document.getElementById('update-role-name').value;
    const description = document.getElementById('update-role-description').value;

    const role = {
        nomeCargo: name,
        descricao: description,
    };

    fetch(`/cargos/update/${idCargo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(role)
    })
        .then(response => {
            if (response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Cargo editado com sucesso",
                    icon: "success",
                    confirmButtonColor: '#16a34a',
                    background: "rgb(32, 32, 32)"
                }).then(result => {
                    if (result.isConfirmed) {
                        window.location.reload();
                        getAll();
                    }
                });
            } else {
                Swal.fire({
                    title: "Erro!",
                    text: "Erro ao editar cargo",
                    icon: "error",
                    confirmButtonColor: '#16a34a',
                    background: "rgb(32, 32, 32)"
                });
            }
        })
        .catch(error => {
            console.log("error: ", error);
        });
}

function deleteRole(idCargo) {
    Swal.fire({
        title: "Tem certeza que deseja deletar esse cargo?",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        cancelButtonColor: "#d33",
        background: "rgb(32, 32, 32)",
        confirmButtonText: "Sim, deletar",
        cancelButtonText: "Não, cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deletado!",
                text: "Esse cargo foi deletado.",
                icon: "success",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)",
            });
            fetch(`/cargos/delete/${idCargo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                getAll();
            }).catch(error => {
                console.log("error: ", error);
            });
        }
    });
}

function showAddModal() {
    const modal = document.getElementById('add-modal');

    if (window.getComputedStyle(modal).display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function showUpdateModal(idCargo, name, description) {
    document.getElementById('update-role-id').setAttribute('value', idCargo);
    document.getElementById('update-role-name').setAttribute('value', name);
    document.getElementById('update-role-description').setAttribute('value', description);

    const modal = document.getElementById('update-modal');

    if (window.getComputedStyle(modal).display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function sair() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}

getAll();