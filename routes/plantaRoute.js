var express = require('express')
var route = express.Router()
var plantaCtr = require('../control/plantaCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',plantaCtr.getPlantas, plantaCtr.listar)
route.get('/',plantaCtr.getPlantas, plantaCtr.listar)

//rota para listar por filtro
route.post('/', plantaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', plantaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), plantaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', plantaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), plantaCtr.edita)

//rota para deletar
route.get('/del/:id', plantaCtr.deleta)

module.exports = route;