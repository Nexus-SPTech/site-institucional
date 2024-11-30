const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const userName = document.getElementById('name_user').innerHTML = sessionStorage.NOME_USUARIO;


function addCompany() {
    const name = document.getElementById('new-company-name').value;
    const cnpj = document.getElementById('new-company-cnpj').value;

    if (!name || !cnpj) {
        Swal.fire({
            title: "Erro ao adicionar a empresa!",
            text: "Preencha todos os campos",
            icon: "error"
        });
        return;
    }

    const company = {
        nomeEmpresa: name,
        cnpj: cnpj,
    };

    fetch(`/empresas/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
    }).then(function (response) {
        if (response.status === 200) {

            Swal.fire({
                title: "Sucesso!",
                text: "Empresa adicionada com sucesso",
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
                text: "Erro ao adicionar empresa",
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
    fetch(`/empresas/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log("response: ", response);
        response.json().then(json => {
            json.forEach(company => {
                const row = userTable.insertRow();
                row.innerHTML = `
                    <td>${company.idEmpresa}</td>
                    <td>${company.nomeEmpresa}</td>
                    <td>${company.cnpj}</td>
                    <td><a onclick="showUpdateModal('${company.idEmpresa}', '${company.nomeEmpresa}', '${company.cnpj}')"><i class="fa-solid fa-pen"></i></a></td>
                    <td><a onclick="deleteCompany(${company.idEmpresa})"><i class="fa-solid fa-trash"></i></a></td>
                `;
            });
        })
    }).catch(function (error) {
        console.log("error: ", error);
    });

    setTimeout(() => {
        document.getElementById('error').innerHTML = "";
    }, 1000);
}

function getCompanyByName(nomeEmpresa) {
    if (!nomeEmpresa) {
        getAll();
        return;
    }

    fetch(`/empresas/getByName/${nomeEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.json().then(json => {
            if (json.length > 0) {
                userTable.innerHTML = '';
                json.forEach(company => {
                    const row = userTable.insertRow();
                    row.innerHTML = `
                        <td>${company.idEmpresa}</td>
                        <td>${company.nomeEmpresa}</td>
                        <td>${company.cnpj}</td>
                        <td><a onclick="showUpdateModal('${company.idEmpresa}', '${company.nomeEmpresa}', '${company.cnpj}')"><i class="fa-solid fa-pen"></i></a></td>
                        <td><a onclick="deleteCompany(${company.idEmpresa})"><i class="fa-solid fa-trash"></i></a></td>
                    `;
                });
            } else {
                document.getElementById('error').innerHTML = "Empresa não encontrada";
                getAll();
            }
        });
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

function updateCompany(event) {
    event.preventDefault();
    const idEmpresa = document.getElementById('update-company-id').value;
    const name = document.getElementById('update-company-name').value;
    const cnpj = document.getElementById('update-company-cnpj').value;

    const company = {
        nomeEmpresa: name,
        cnpj: cnpj,
    };

    fetch(`/empresas/update/${idEmpresa}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
    })
        .then(function (response) {
            if (response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Empresa editada com sucesso",
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
                    text: "Erro ao editar empresa",
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

function deleteCompany(idEmpresa) {
    Swal.fire({
        title: "Tem certeza que deseja deletar essa empresa?",
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
                title: "Deletada!",
                text: "Essa empresa foi deletada.",
                icon: "success",
                confirmButtonColor: '#16a34a',
                background: "rgb(32, 32, 32)",
            });
            fetch(`/empresas/delete/${idEmpresa}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function () {
                getAll();
            }).catch(function (error) {
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

function showUpdateModal(idEmpresa, name, cnpj) {
    document.getElementById('update-company-id').setAttribute('value', idEmpresa);
    document.getElementById('update-company-name').setAttribute('value', name);
    document.getElementById('update-company-cnpj').setAttribute('value', cnpj);

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