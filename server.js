const http = require("http")

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.end("Dados de Animais")
})

server.listen(1234, () => {
    console.log("Servidor rodando em http://localhost:1234")
})
