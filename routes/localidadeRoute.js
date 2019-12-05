var express = require('express')
var route = express.Router()
var localidadeCtr = require('../control/localidadeCtr')

// rota para listar todos usando middleware
//route.get('/',localidadeCtr.getLocalidades, localidadeCtr.listar)
route.get('/',localidadeCtr.getLocalidades, localidadeCtr.listar)

//rota para listar por filtro
route.post('/', localidadeCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', localidadeCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', localidadeCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', localidadeCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', localidadeCtr.edita)

//rota para deletar
route.get('/del/:id', localidadeCtr.deleta)

module.exports = route;