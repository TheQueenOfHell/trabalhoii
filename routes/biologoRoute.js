var express = require('express')
var route = express.Router()
var biologoCtr = require('../control/biologoCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',autorCtr.getautors, autorCtr.listar)

//rota para listar todos
route.get('/', biologoCtr.listar)

//rota para listar por filtro
route.post('/', biologoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', biologoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', biologoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', biologoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', biologoCtr.edita)

//rota para deletar
route.get('/del/:id', biologoCtr.deleta)

module.exports = route;