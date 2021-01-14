'use strict'

/**
 * Modulos externos requeridos
 */
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const mongodb = require('mongodb');
const app = express();
var router = express.Router();

/**
 * Requires
 */
var common = require('./common');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/pdf', express.static(__dirname + '/public/pdf'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

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
  common.informes_docencia = db.collection("informes_docencia");

});

/**
 * Vistas
 */

app.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
});

require('./routers')(app);