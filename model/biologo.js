const conexao = require('./conexao')

var biologo = conexao.Schema({
    nome:{
        type:String
    },
    idade:{
        type:String
    },
    datanasc:{
        type:Date
    },
    curriculo:{
        type:String
    },
    especializacoes:{
        type:String
    },
    crbio:{
        type:Number
    }
})

module.exports = conexao.model("biologo",biologo)