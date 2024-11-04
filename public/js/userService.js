const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

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
                row.insertCell(0).innerText = user.idUsuario;
                row.insertCell(1).innerText = user.nomeUsuario;
                row.insertCell(2).innerText = user.email;
                row.insertCell(3).innerText = user.nome;
                row.insertCell(4).innerText = user.nomeEmpresa;
            });
        })
    }).catch(function (error) {
        console.log("error: ", error);
    });
}

populateUsers();