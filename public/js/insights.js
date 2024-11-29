fetch(`/dash/respostaInsight/`)
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (dados) {
                        console.log("Dados recebidos: ", JSON.stringify(dados));

                        plotarGrafico(dados);
                    });
                } else {
                    console.log("Dados recebidos: ", JSON.stringify(dados));
                    console.error('Nenhum dado encontrado da pergunta1 ou erro na API');
                    
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

           function plotarGrafico(dados){
            console.log("Dados recebidos no plotarGrafico: ", JSON.stringify(dados));
            insight = dados.map(item => item.resposta);
            resposta_insight.innerHTML += `${insight}`;
           
            }