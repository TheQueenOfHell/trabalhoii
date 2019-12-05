const conexao = require('./conexao')

var localidade = conexao.Schema({
    endereco:{
        type:String
    },
    cidade:{
        type:String
    },
    estado:{
        type:String
    },
    biologo:
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"biologo"
        }
    
})

module.exports = conexao.model("localidade",localidade)