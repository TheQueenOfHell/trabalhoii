const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var localidadeRoute = require('./routes/localidadeRoute')
var biologoRoute = require('./routes/biologoRoute')
var eplantaRoute = require('./routes/eplantaRoute')
var plantaRoute = require('./routes/plantaRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/localidade',localidadeRoute)
app.use('/biologo',biologoRoute)
app.use('/eplanta',eplantaRoute)
app.use('/planta',plantaRoute)