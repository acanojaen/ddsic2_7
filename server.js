'use strict'

/**
 * Modulos externos requeridos
 */

const express = require("express");
const path = require("path");
const mongodb = require('mongodb');
const app = express();

/**
 * Requires
 */
var common = require('./common');
var rest = require('./rest');
var lib = require('./lib')

/**
 * Configuracion
 */
var config = {
  mongo_port: 8080,
  dbURL: "mongodb://localhost:27017",
  dbName: "almacen"
}

/**
 *  Configuracion de la App
 */
app.listen(config.mongo_port, function() {
  console.log('Servidor HTTP en la url http://localhost:' + config.mongo_port + '/')
});

/**
 * Inicializar base de datos
 */
mongodb.connect(config.dbURL, function(err, con){
  if(err){
    console.log("Conexión a la base de datos fallida");
    process.exit(0);
  }

  console.log("Conexión a la base de datos correcta: " + config.dbURL);
  var db = con.db(config.dbName)

  common.informes_departamento = db.collection("informes_departamento");
  common.informes_docencia = db.collection("informes_docencia")
});




/**
 * Vistas
 * 
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
  });

const departamento = require('./common');
const { Console } = require("console");
app.get("/departamento", (req, res) => {  
  common.informes_departamento.find({}).toArray(function(err, inf) {
    if (err) {
        res.send(err);
    } else if (inf.length) {
        res.render('departamento', {
            'informes': inf,
        });
    } else {
        res.send('No documents found');
  }
  });

  


});


app.get("/docencia", (req, res) => {
  res.render("docencia", { title: "Informes de Docencia" });

});






