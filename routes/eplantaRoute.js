var express = require('express')
var route = express.Router()
var eplantaCtr = require('../control/eplantaCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',eplantaCtr.geteplantas, eplantasCtr.listar)

//rota para listar todos
route.get('/', eplantaCtr.listar)

//rota para listar por filtro
route.post('/', eplantaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', eplantaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), eplantaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', eplantaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), eplantaCtr.edita)

//rota para deletar
route.get('/del/:id', eplantaCtr.deleta)

module.exports = route;