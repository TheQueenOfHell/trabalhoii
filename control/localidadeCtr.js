var localidade = require('../model/localidade')
var biologo = require('../model/biologo')

//middleware para buscar localidades
function getLocalidades(req,res,next){
    localidade.find({}).lean().exec(function(err,docs){
        req.localidades = docs
        next()
    })
}

function listar(req,res){
    localidade.find({}).populate('biologo').lean()
    .exec(function(err,docs){
        res.render('localidade/list.ejs',{"Localidades" : docs})
    })
}

function filtrar(req,res){
    localidade.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .populate('biologo')
    .lean().exec(function(err,docs){
        res.render('localidade/list.ejs',{"Localidades" : docs})
    })
}

function abrirAdiciona(req,res){
  biologo.find({}).lean().exec(function (e,biologos){
      res.render("localidade/add.ejs",{"Biologos": biologos})
  })
}

function adiciona(req,res){
    var novoLocalidade = new localidade({
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        estado: req.body.estado,
        biologo: req.body.biologo
    })
    novoLocalidade.save(function(err){
        if(err){
            localidade.find({}).populate('biologo').lean().exec(function(err,docs){
                res.render('localidade/list.ejs', { msg: "Problema ao salvar!", Localidades: docs })
            })            
        }else{
            localidade.find({}).populate('biologo').lean().exec(function(err,docs){
                res.render('localidade/list.ejs', { msg: "Adicionado com sucesso!", Localidades: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
   biologo.find({}).lean().exec(function (e,biologos){
       localidade.findOne({_id: req.params.id}).populate('biologo').exec(
           function (err,localidade){
               res.render('localidade/edit.ejs',{'localidade':localidade, "Biologos":biologos});
           }
       )
   })
}

function edita(req,res){
    localidade.findByIdAndUpdate(req.params.id, {
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        estado: req.body.estado,
        biologo: req.body.biologos
    },function(err){
        if(err){
            localidade.find({}).populate('biologo').lean().exec(function(err,docs){
                res.render('localidade/list.ejs', { msg: "Problema ao editar!", Localidades: docs })
            })            
        }else{
            localidade.find({}).populate('biologo').lean().exec(function(err,docs){
                res.render('localidade/list.ejs', { msg: "Editado com sucesso!", Localidades: docs })
            })   
        }
    })
}

function deleta(req,res){
    localidade.findByIdAndDelete(req.params.id,function(){
        localidade.find({}).populate('biologo').lean().exec(function(err,docs){
            res.render('localidade/list.ejs', { msg: "Removido com sucesso!", Localidades: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getLocalidades
}