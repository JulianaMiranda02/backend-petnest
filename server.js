const http = require("http") // biblioteca, pacote ou modulo

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
})

function animaisPerdidos(pedido, resposta) {
    console.log("Pedido de Animais Perdidos");
    resposta.writeHead(200, { "Content-Type": "text/plain" })
    resposta.end("Pedido de Animais Perdidos")
}

function sinalizarAnimal(pedido, resposta) {
    let body_cru = "";
    // recebe os pedaços do body
    pedido.on("data", chunk => {
        body_cru += chunk.toString();
    });
    // quando termina de receber
    pedido.on("end", () => {
        const body = JSON.parse(body_cru); // transforma em objeto JavaScript

        pool.query(
            "INSERT INTO animais_perdidos (nome_sinalizador, telefone, sexo, tipo, porte, descricao, link_foto, rua, numero, bairro, cidade, estado, cep) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [body.nome_sinalizador, body.telefone, body.sexo, body.tipo, body.porte, body.descricao, body.link_foto, body.rua, body.numero, body.bairro, body.cidade, body.estado, body.cep],
            (erro, result) => {
                if (erro) {
                    console.error(erro)
                    return
                }

                console.log("Animal sinalizado com sucesso");
                resposta.writeHead(200, { "Content-Type": "text/plain" })
                resposta.end("Animal sinalizado com sucesso")
            }
        )
    });
}

function deletarAnimal(pedido, resposta) {
    let body_cru = "";
    
    pedido.on("data", chunk => {
        body_cru += chunk.toString();
    });

     pedido.on("end", () => {
        const body = JSON.parse(body_cru);

         pool.query(
            "delete from animais_perdidos where id = ?" ,
            [body.id],
            (erro, result) => {
                if (erro) {
                    console.error(erro)
                    return
                }
                console.log("Animal deletado");
                resposta.writeHead(200, { "Content-Type": "text/plain" })
                resposta.end("Animal deletado")
            }
         )
     });
}

// Cria o servidor e coloca na variavel server
const server = http.createServer((pedido, resposta) => {
    // dentro da variavel pedido (objeto) tem uma propriedade (chave) method e url
    // method vai ter métod do pedido (se é GET, POST ou DELETE)
    // url vai ter o endpoint: ex: '/animais-perdidos'

    // se for um pedido no endpoint '/animais-perdidos' 
    if (pedido.url === "/animais-perdidos" && pedido.method === "GET") {
        animaisPerdidos(pedido, resposta)
    }

    // se for um pedido no endpoint '/sinalizar-animal' 
    else if (pedido.url === "/sinalizar-animal" && pedido.method === "POST") {
        sinalizarAnimal(pedido, resposta)
    }

    // se for um pedido no endpoint '/deletar-animal'
    else if (pedido.url === "/deletar-animal" && pedido.method === "DELETE") {
        deletarAnimal(pedido, resposta)
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