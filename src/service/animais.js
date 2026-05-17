const url = require("url");

function animaisPerdidos(pedido, resposta, pool) {
    //     console.log("Pedido de Animais Perdidos");
    //     resposta.writeHead(200, { "Content-Type": "text/plain" })
    //     resposta.end("Pedido de Animais Perdidos")

    const parsedUrl = url.parse(pedido.url, true);
    const query = parsedUrl.query;

    const cidade = query.cidade;
    const estado = query.estado;

    pool.query("select * from animais_perdidos where cidade = ? and estado = ?", [cidade, estado], (erro, resultados) => {
        if (erro) {
            resposta.writeHead(500, { "Content-Type": "application/json" });
            resposta.end("Deu erro, desculpa ai. Tente novamente mais tarde");
            return;
        }
        // resposta OK
        resposta.writeHead(200, { "Content-Type": "application/json" });
        resposta.end(JSON.stringify(resultados));
    });
}

function sinalizarAnimal(pedido, resposta, pool) {
    let body_cru = "";
    // recebe os pedaços do body
    pedido.on("data", chunk => {
        body_cru += chunk.toString();
    });
    // quando termina de receber
    pedido.on("end", () => {
        const body = JSON.parse(body_cru); // transforma em objeto JavaScript

        pool.query(
            "INSERT INTO animais_perdidos (nome_sinalizador, telefone, sexo, tipo, porte, descricao, imagem, rua, numero, bairro, cidade, estado, cep) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [body.nome_sinalizador, body.telefone, body.sexo, body.tipo, body.porte, body.descricao, body.imagem, body.rua, body.numero, body.bairro, body.cidade, body.estado, body.cep],
            (erro, result) => {
                if (erro) {
                    console.error(erro);
                    resposta.writeHead(500, { "Content-Type": "application/json" });
                    resposta.end(JSON.stringify({ erro: "Erro ao salvar no banco" }));
                    return;


                }

                console.log("Animal sinalizado com sucesso");
                resposta.writeHead(200, { "Content-Type": "text/plain" })
                resposta.end("Animal sinalizado com sucesso")
            }
        )
    });
}

function deletarAnimal(pedido, resposta, pool) {
    let body_cru = "";

    pedido.on("data", chunk => {
        body_cru += chunk.toString();
    });

    pedido.on("end", () => {
        const body = JSON.parse(body_cru);

        pool.query(
            "delete from animais_perdidos where id = ?",
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

module.exports = {
   animaisPerdidos,
   sinalizarAnimal,
   deletarAnimal,
};
