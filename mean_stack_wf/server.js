const express = require('express')
const path = require("path")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }))
//nombre a mostrar =public, nombre físico=dist
app.use('/public',express.static('dist'))
///////////////////////////////////////////////

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/foo', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
	console.log("Entro a la página FOO");
})
app.get('/bar', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
	console.log("Entro a la página BAR");
})
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html')
})

app.listen(3300, () => console.log('Example app listening on port 3300!'))
