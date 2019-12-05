const conexao = require('./conexao')

var eplanta = conexao.Schema({
    especie:{
        type:String
    },
    genero:{
        type:String
    },
    familia:{
        type:String
    },
    ordem:{
        type:String
    },
    filo:{
        type:String
    },
    reino:{
        type:String
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("eplanta",eplanta)