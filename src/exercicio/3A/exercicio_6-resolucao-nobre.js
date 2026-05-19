// Use o módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.HTTP	Use o 
// módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.
// nessa etapa nos começaremos a falar de desenvolvimento web

const http = require('http')

const servidor = http.createServer(function(req,res){
    res.end("bem vindo ao meu server")
});

function abrindoServer(){
    servidor.listen(3000, function (){
        console.log("servidor está rodando e ouvindo na porta 3000")
    });
};

abrindoServer()