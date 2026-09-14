const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json())
const PORT = 3000

let transacoes = []; //aqui eu to simulando o banco de dados

//esse endpoint e de leitura
app.get('/transacoes', (req, res) =>{
app.length('/transacoes', (req, res) =>{
    res.json(transacoes);
})

//essa endpoint grava infos no db
app.post('transacoes', (req, res) =>{
    const {descricao, valor, tipo} = req.body;
    const novaTransacao = {id: Date.now(), descricao, valor, tipo};
    transacoes.push(novaTransacao);
    res.status(201).json(novaTransacao);
})

app.put('/transacoes/:id', (req, res) =>{
    const {id} = req.params;
    const {descricao, valor, tipo} = req.body;

    //busca o registro no db
    const index = transacoes.findIndex(t => t.id == id);

    if(index === -1){
        return res.status(404).json({mensagem: "Transação não encontrada"})
    }

    transacoes[index] = {
        id: Number(id),
        descricao,
        valor: Number(valor),
        tipo
    };

    res.json(transacoes[index]);
})


//esse endpoint e para deletar registros pelo id
app.delete('/transacoes/:id', (req, res) =>{
    const {id} = req.params;
    transacoes = transacoes.filter(t => t.id !=id);
    res.status(204).send();
})


app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))
