const crudsButtons = document.getElementById("cruds-buttons");
const resposta_insight = document.getElementById("resposta_insight");

if (sessionStorage.CARGO_USUARIO != 'Dev' && sessionStorage.CARGO_USUARIO != 'Admin') {
    crudsButtons.style.display = "none";
}

fetch(`/dash/respostaInsight/`)
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (dados) {
                console.log("Dados recebidos: ", JSON.stringify(dados));
                if (dados && dados.length > 0) {
                    plotarGrafico(dados);
                } else {
                    resposta_insight.innerHTML = "<p>Nenhum dado encontrado.</p>";
                }
            });
        } else {
            console.error('Erro na API ou nenhum dado encontrado.');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
        resposta_insight.innerHTML = `<p>Erro ao carregar os dados: ${error.message}</p>`;
    });

function plotarGrafico(dados) {
    console.log("Dados recebidos no plotarGrafico: ", JSON.stringify(dados));
    
    resposta_insight.innerHTML = "";

   
    dados.forEach(item => {
        const insightDiv = document.createElement("div");
        insightDiv.className = "insight-item";

        insightDiv.innerHTML = `
            <h3>${item.titulo || "Insight"}</h3>
            <p>${item.resposta}</p>
        `;

        resposta_insight.appendChild(insightDiv);
    });
}

function sair() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
