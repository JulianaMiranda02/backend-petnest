const http = require("http") // biblioteca, pacote ou modulo
const animal = require("./service/animais");
// Conexão backend JavaScript com Banco de Dados MYSQL
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "petnest",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cria o servidor e coloca na variavel server
const server = http.createServer((pedido, resposta) => {
    // CORS (mecanismo de seguranca do navegador)
    // libera acesso para qualquer origem
    resposta.setHeader("Access-Control-Allow-Origin", "*");
    // // libera métodos
    resposta.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // // libera headers
    resposta.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // CORS (mecanismo de seguranca do navegador)
    // resolve o preflight (OPTIONS)
    if (pedido.method === "OPTIONS") {
        resposta.writeHead(204);
        return resposta.end();
    }
    // dentro da variavel pedido (objeto) tem uma propriedade (chave) method e url
    // method vai ter métod do pedido (se é GET, POST ou DELETE)
    // url vai ter o endpoint: ex: '/animais-perdidos'

    // se for um pedido no endpoint '/animais-perdidos' 
    if (pedido.url.startsWith("/animais-perdidos") && pedido.method === "GET") {
        animal.animaisPerdidos(pedido, resposta, pool)
    }

    // se for um pedido no endpoint '/sinalizar-animal' 
    else if (pedido.url === "/sinalizar-animal" && pedido.method === "POST") {
        animal.sinalizarAnimal(pedido, resposta, pool)
    }

    // se for um pedido no endpoint '/deletar-animal'
    else if (pedido.url === "/deletar-animal" && pedido.method === "DELETE") {
        animal.deletarAnimal(pedido, resposta, pool)
    }
    
})

// Inicia o servidor, coloca para rodar
server.listen(1234, () => {
    console.log("Servidor rodando com sucesso em http://localhost:1234")
})

/* ENCERRAR O POOL QUANDO O APP FECHAR */
function shutdown() {
    console.log("Encerrando servidor...")

    pool.end((err) => {
        if (err) {
            console.error("Erro ao fechar pool:", err)
        } else {
            console.log("Pool MySQL encerrado ✅")
        }
        process.exit(0)
    })
}

// Ctrl + C no terminal
process.on("SIGINT", shutdown)

// Encerramento do sistema (Docker, servidor, etc)
process.on("SIGTERM", shutdown)



