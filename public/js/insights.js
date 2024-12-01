const crudsButtons = document.getElementById("cruds-buttons");
const resposta_insight = document.getElementById("resposta_insight");

document.getElementById('name_user').innerHTML = sessionStorage.NOME_USUARIO;
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

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
        resposta_insight.innerHTML = ""; // Limpar conteúdo anterior
    
        dados.forEach(item => {
            const texto = item.resposta; // Supondo que a resposta seja a string retornada
            const secoes = texto.split(/\*\*(.*?)\*\*/g); // Dividir em seções baseadas em `**`
    
            for (let i = 1; i < secoes.length; i += 2) {
                const titulo = secoes[i].trim(); // Extrai o título (entre os `**`)
                const conteudo = (secoes[i + 1] || "").trim(); // Extrai o conteúdo após o título
    
                // Criar a estrutura HTML para o título e o conteúdo
                const secaoDiv = document.createElement("div");
                secaoDiv.className = "insight-section";
    
                secaoDiv.innerHTML = `
                    <h3>${titulo}</h3>
                    <p>${conteudo}</p>
                `;
    
                resposta_insight.appendChild(secaoDiv);
            }
        });
    }
    

function sair() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
