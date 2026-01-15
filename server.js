const http = require("http")

function animaisPerdidos(resposta) {
    console.log("Pedido de Animais Perdidos");
    resposta.writeHead(200, { "Content-Type": "text/plain" })
    resposta.end("Pedido de Animais Perdidos")
}

function sinalizarAnimal(resposta) {
    console.log("Pedido de Sinalizar Animal");
    resposta.writeHead(200, { "Content-Type": "text/plain" })
    resposta.end("Pedido de Sinalizar Animal")
}

function deletarAnimal(resposta) {
    console.log("Pedido de Deletar Animal");
    resposta.writeHead(200, { "Content-Type": "text/plain" })
    resposta.end("Pedido de Deletar Animal")
}

const server = http.createServer((pedido, resposta) => {
    // dentro da variavel pedido (objeto) tem uma propriedade (chave) method e url
    // method vai ter métod do pedido (se é GET, POST ou DELETE)
    // url vai ter o endpoint: ex: '/animais-perdidos'

    // se for um pedido no endpoint '/animais-perdidos' 
    if (pedido.url === "/animais-perdidos" && pedido.method === "GET") {
        animaisPerdidos(resposta)
    }

    // se for um pedido no endpoint '/sinalizar-animal' 
    else if (pedido.url === "/sinalizar-animal" && pedido.method === "POST") {
        sinalizarAnimal(resposta)
    }

    // se for um pedido no endpoint '/deletar-animal'
    else if (pedido.url === "/deletar-animal" && pedido.method === "DELETE") {
        deletarAnimal(resposta)
    }
})

server.listen(1234, () => {
    console.log("Servidor rodando em http://localhost:1234")
})