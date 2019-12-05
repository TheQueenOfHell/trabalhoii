const conexao = require('./conexao')

var planta = conexao.Schema({
    nomec:{
        type:String
    },
    nomep:{
        type:String
    },
    sintomas:{
        type:String
    },
    efeitos:{
        type:String
    },
    foto:{
        type:String
    },
    localidade:{
        type:conexao.Schema.Types.ObjectId,
        ref: "localidade"
    },
    eplanta:{
        type:conexao.Schema.Types.ObjectId,
        ref: "eplanta"
    },
    biologo:{
        type:conexao.Schema.Types.ObjectId,
        ref: "biologo"
    }
})

module.exports = conexao.model("planta",planta)