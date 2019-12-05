var biologo = require('../model/biologo')


//middleware para buscar autores
function getBiologos(req, res, next) {
    biologo.find({}).lean().exec(function (err, docs) {
        req.biologos = docs
        next()
    })
}

function listar(req, res) {
    biologo.find({}).lean().exec(function (err, docs) {
        res.render('biologo/list.ejs', { "Biologos": docs })
    })
}

function filtrar(req, res) {
    biologo.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('biologo/list.ejs', { "Biologos": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("biologo/add.ejs")
}

function adiciona(req, res) {
    console.log(req.body)
    var novoBiologo = new biologo({
        nome: req.body.nome,
        idade: req.body.idade,
        datanasc: req.body.datanasc,
        curriculo: req.body.curriculo,
        especializacoes:req.body.especializacoes,
        crbio:req.body.crbio
    })
    novoBiologo.save(function (err) {
        if (err) {
            biologo.find({}).lean().exec(function (err, docs) {
                res.render('biologo/list.ejs', { msg: "Problema ao salvar!", Biologos: docs })
            })
        } else {
            biologo.find({}).lean().exec(function (err, docs) {
                res.render('biologo/list.ejs', { msg: "Adicionado com sucesso!", Biologos: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    biologo.findById(req.params.id, function (err, biologo) {
        res.render('biologo/edit.ejs', { 'biologo': biologo });
    })
}

function edita(req, res) {
    biologo.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            idade: req.body.idade,
            datanasc: req.body.datanasc,
            curriculo: req.body.curriculo,
            especializacoes:req.body,especializacoes,
            crbio:req.body.crbio
        }, function (err) {
            if (err) {
                biologo.find({}).lean().exec(function (err, docs) {
                    res.render('biologo/list.ejs', { msg: "Problema ao editar!", Biologos: docs })
                })
            } else {
                biologo.find({}).lean().exec(function (err, docs) {
                    res.render('biologo/list.ejs', { msg: "Editado com sucesso!", Biologos: docs })
                })
            }
        })
}

function deleta(req, res) {
    biologo.findByIdAndDelete(req.params.id, function () {
        biologo.find({}).lean().exec(function (err, docs) {
            res.render('biologo/list.ejs', { msg: "Removido com sucesso!", Biologos: docs })
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
    getBiologos
}