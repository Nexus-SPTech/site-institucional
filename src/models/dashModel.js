var database = require("../database/config")


function mediaMaterias() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
        SELECT 
    d.nome_disciplina AS disciplina,
    ROUND(AVG(na.nota), 2) AS media_nota
FROM 
    notas_aluno na
JOIN 
    disciplina d
ON 
    na.fkDisciplina = d.idDisciplina
GROUP BY 
    d.nome_disciplina;


    `;
    return database.executar(instrucaoSql);
}



function kpiMelhorAproveitamento() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
        SELECT 
    d.nome_disciplina AS disciplina,
    ROUND(AVG(na.nota), 2) AS media_nota
FROM 
    notas_aluno na
JOIN 
    disciplina d
ON 
    na.fkDisciplina = d.idDisciplina
GROUP BY 
    d.nome_disciplina
ORDER BY 
    media_nota DESC
LIMIT 1;



    `;
    return database.executar(instrucaoSql);
}


function kpiMediaAcertos() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
     SELECT 
    round(AVG(nota),2) AS media_geral_acertos
FROM 
    notas_aluno;
    `;
    return database.executar(instrucaoSql);
}



function kpiMateriaComDificuldade() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
     
     SELECT 
    d.nome_disciplina AS disciplina,
    round(AVG(na.nota), 2) AS media_nota
FROM 
    notas_aluno na
JOIN 
    disciplina d ON na.fkDisciplina = d.idDisciplina
GROUP BY 
    d.nome_disciplina
ORDER BY 
    media_nota ASC
LIMIT 1;


    `;
    return database.executar(instrucaoSql);
}

function kpiNotasFeminino() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
      SELECT 
    'Feminino' AS genero,
   round(AVG(na.nota), 2) AS media_nota
FROM 
    notas_aluno na
JOIN 
    aluno a ON na.fkAluno = a.codAluno
WHERE 
    a.genero = 'F';



    `;
    return database.executar(instrucaoSql);
}

function kpiNotasMasculino() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
     SELECT 
    'Masculino' AS genero,
   round(AVG(na.nota), 2) AS media_nota
FROM 
    notas_aluno na
JOIN 
    aluno a ON na.fkAluno = a.codAluno
WHERE 
    a.genero = 'M';




    `;
    return database.executar(instrucaoSql);
}


function graficoMediaAcertosMateria() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
    SELECT 
    d.nome_disciplina AS disciplina,
    round(AVG(na.nota), 2) AS porcentagem_aproveitamento
FROM 
    notas_aluno na
JOIN 
    disciplina d ON na.fkDisciplina = d.idDisciplina
GROUP BY 
    d.nome_disciplina;


    `;
    return database.executar(instrucaoSql);
}


    function graficoRegioesMetropolitanas(){
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
   SELECT
    SUBSTRING(i.regiao_metropolitana, 24, 17) AS regiao,
    round(AVG(na.nota),2) AS media_notas
FROM
    instituicao i
JOIN
    aluno a ON i.codInstituicao = a.fkInstituicao
JOIN
    notas_aluno na ON a.codAluno = na.fkAluno
GROUP BY
    SUBSTRING(i.regiao_metropolitana, 24, 17);

    `;
    return database.executar(instrucaoSql);
    }


        function graficoAproveitamento1Serie(){
            console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
            var instrucaoSql = `
           SELECT 
    d.nome_disciplina AS disciplina,
    round(AVG(na.nota), 2) AS media_notas
FROM 
    aluno a
JOIN 
    notas_aluno na ON a.codAluno = na.fkAluno
JOIN 
    disciplina d ON na.fkDisciplina = d.idDisciplina
WHERE 
    a.serie = 'EM-1ª série'
GROUP BY 
    d.nome_disciplina;
        
            `;
            return database.executar(instrucaoSql);
        }


        function graficoAproveitamento2Serie(){
            console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
            var instrucaoSql = `
             SELECT 
    d.nome_disciplina AS disciplina,
    round(AVG(na.nota), 2) AS media_notas
FROM 
    aluno a
JOIN 
    notas_aluno na ON a.codAluno = na.fkAluno
JOIN 
    disciplina d ON na.fkDisciplina = d.idDisciplina
WHERE 
    a.serie = 'EM-2ª série'
GROUP BY 
    d.nome_disciplina;
            `;
            return database.executar(instrucaoSql);
        }

        function graficoAproveitamento3Serie(){
            console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
            var instrucaoSql = `
           SELECT 
    d.nome_disciplina AS disciplina,
    round(AVG(na.nota), 2) AS media_notas
FROM 
    aluno a
JOIN 
    notas_aluno na ON a.codAluno = na.fkAluno
JOIN 
    disciplina d ON na.fkDisciplina = d.idDisciplina
WHERE 
    a.serie = 'EM-3ª série'
GROUP BY 
    d.nome_disciplina;
        
            `;
            return database.executar(instrucaoSql);
        }
        function  respostaInsight(){
            console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
            var instrucaoSql = `
          SELECT * 
FROM nexus_ia
ORDER BY id DESC
LIMIT 1;        
            `;
            return database.executar(instrucaoSql);
        }

       
module.exports = {
  mediaMaterias,
  kpiMelhorAproveitamento,
  kpiMediaAcertos,
  kpiMateriaComDificuldade,
  kpiNotasMasculino,
  kpiNotasFeminino,
  graficoMediaAcertosMateria,
  graficoRegioesMetropolitanas,
  graficoAproveitamento1Serie,
  graficoAproveitamento2Serie,
  graficoAproveitamento3Serie,
  respostaInsight

};