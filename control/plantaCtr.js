var planta = require('../model/planta')
var biologo = require('../model/biologo')
var eplanta = require('../model/eplanta')
var localidade = require('../model/localidade')

//middleware para buscar plantas
function getPlantas(req, res, next) {
    planta.find({}).lean().exec(function (err, docs) {
        req.plantas = docs
        next()
    })
}

function listar(req, res) {
    planta
        .find({})
        .populate('localidade')
        .populate('eplanta')
        .populate('biologo')
        .lean()
        .exec(function (err, docs) {
            res.render('planta/list.ejs', { "Plantas": docs })
        })
}

function filtrar(req, res) {
    planta
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('localidade')
        .populate('eplanta')
        .populate('biologo')
        .lean()
        .exec(function (err, docs) {
            res.render('planta/list.ejs', { "Plantas": docs })
        })
}

function abrirAdiciona(req, res) {
    localidade
        .find({})
        .lean()
        .exec(function (e, localidades) {
            eplanta
                .find({})
                .lean()
                .exec(function (e, eplantas) {
                    biologo
                        .find({})
                        .lean()
                        .exec(function (e, biologos) {
                            res.render("planta/add.ejs", { "Localidades": localidades, "Eplantas": eplantas, "Biologos": biologos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoPlanta = new planta({
        nomec: req.body.nomec,
        nomep:req.body.nomep,
        sintomas: req.body.sintomas,
        efeitos: req.body.efeitos,
        foto: req.file.filename,
        localidade: req.body.localidade,
        eplanta: req.body.eplanta,
        biologo: req.body.biologo,
    })
    novoPlanta.save(function (err) {
        if (err) {
            planta.find({}).populate('localidade').populate('eplanta').populate('biologo').lean().exec(function (err, docs) {
                res.render('planta/list.ejs', { msg: "Problema ao salvar!", Plantas: docs })
            })
        } else {
            planta.find({}).populate('localidade').populate('eplanta').populate('biologo').lean().exec(function (err, docs) {
                res.render('planta/list.ejs', { msg: "Adicionado com sucesso!", Plantas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    localidade.find({}).lean().exec(
        function (e, editoras) {
            eplanta.find({}).lean().exec(
                function (e, autores) {
                    biologo.find({}).lean().exec(
                        function (e, generos) {
                            planta.findOne({ _id: req.params.id }).populate('localidade').populate('eplanta').populate('biologo').exec(
                                function (err, planta) {
                                    res.render('planta/edit.ejs', { 'planta': planta, "Eplantas": eplantas, "Localidades": localidades, "Biologos": biologos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    planta.findByIdAndUpdate(req.params.id,
        {
            nomec: req.body.nomec,
            nomep:req.body.nomep,
            sintomas: req.body.sintomas,
            efeitos: req.body.efeitos,
            foto: req.file.filename,
            localidade: req.body.localidade,
            eplanta: req.body.eplanta,
            biologo: req.body.biologo,
        }, function (err) {
            if (err) {
                planta.find({}).populate('localidade').populate('eplanta').populate('biologo').lean().exec(function (err, docs) {
                    res.render('planta/list.ejs', { msg: "Problema ao editar!", Plantas: docs })
                })
            } else {
                planta.find({}).populate('localidade').populate('eplanta').populate('biologo').lean().exec(function (err, docs) {
                    res.render('planta/list.ejs', { msg: "Editado com sucesso!", Plantas: docs })
                })
            }
        })
}

function deleta(req, res) {
    planta.findByIdAndDelete(req.params.id, function () {
        planta.find({}).populate('localidade').populate('eplanta').populate('biologo').lean().exec(function (err, docs) {
            res.render('planta/list.ejs', { msg: "Removido com sucesso!", Plantas: docs })
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
    getPlantas
}