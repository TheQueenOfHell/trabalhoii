var eplanta = require('../model/eplanta')


//middleware para buscar eplantas
function getEplantas(req, res, next) {
    eplanta.find({}).lean().exec(function (err, docs) {
        req.eplantas = docs
        next()
    })
}

function listar(req, res) {
    eplanta.find({}).lean().exec(function (err, docs) {
        res.render('eplanta/list.ejs', { "Eplantas": docs })
    })
}

function filtrar(req, res) {
    eplanta.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('eplanta/list.ejs', { "Eplantas": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("eplanta/add.ejs")
}

function adiciona(req, res) {
    var novoEplanta = new eplanta({
        especie: req.body.especie,
        genero: req.body.genero,
        familia: req.body.familia,
        ordem:req.body.ordem,
        filo:req.body.filo,
        reino:req.body.reino,
        foto: req.file.filename
    })
    novoEplanta.save(function (err) {
        if (err) {
            eplanta.find({}).lean().exec(function (err, docs) {
                res.render('eplanta/list.ejs', { msg: "Problema ao salvar!", Eplantas: docs })
            })
        } else {
            eplanta.find({}).lean().exec(function (err, docs) {
                res.render('eplanta/list.ejs', { msg: "Adicionado com sucesso!", Eplantas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    eplanta.findById(req.params.id, function (err, eplanta) {
        res.render('eplanta/edit.ejs', { 'eplanta': eplanta });
    })
}

function edita(req, res) {
    eplanta.findByIdAndUpdate(req.params.id,
        {
            especie: req.body.especie,
            genero: req.body.genero,
            familia: req.body.familia,
            ordem:req.body.ordem,
            filo:req.body.filo,
            reino:req.body.reino,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                eplanta.find({}).lean().exec(function (err, docs) {
                    res.render('eplanta/list.ejs', { msg: "Problema ao editar!", Eplantas: docs })
                })
            } else {
                eplanta.find({}).lean().exec(function (err, docs) {
                    res.render('eplanta/list.ejs', { msg: "Editado com sucesso!", Eplantas: docs })
                })
            }
        })
}

function deleta(req, res) {
    eplanta.findByIdAndDelete(req.params.id, function () {
        eplanta.find({}).lean().exec(function (err, docs) {
            res.render('eplanta/list.ejs', { msg: "Removido com sucesso!", Eplantas: docs })
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
    getEplantas
}