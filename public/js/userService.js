const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const userName = document.getElementById('name_user');

userName.innerHTML = sessionStorage.NOME_USUARIO;

function populateUsers() {
    userTable.innerHTML = '';
    fetch("/usuarios/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response){ 
        console.log("response: ", response);
        response.json().then(json => {
            json.forEach(user => {
                const row = userTable.insertRow();
                row.insertCell(0).innerHTML = user.idUsuario;
                row.insertCell(1).innerHTML = user.nomeUsuario;
                row.insertCell(2).innerHTML = user.email;
                row.insertCell(3).innerHTML = user.nomeCargo == undefined ? 'Não definido' : user.nomeCargo;
                row.insertCell(4).innerHTML = user.nomeEmpresa == undefined ? 'Não definida' : user.nomeEmpresa;
                row.insertCell(5).innerHTML = `<i class="fa-solid fa-pen"></i>`;
                row.insertCell(6).innerHTML = `<i class="fa-solid fa-trash"></i>`;
            });
        })
    }).catch(function (error) {
        console.log("error: ", error);
    });
}


populateUsers();