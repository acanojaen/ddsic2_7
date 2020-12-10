'use strict'

/**
 * Modulos externos requeridos
 */

const express = require("express");
const path = require("path");
const bd = require('mongoose');

/**
 * Variables app
 */


const app = express();
const mongo_port = process.env.PORT || "27017";
const http_port = process.env.PORT || "8080";


/**
 * Inicializar base de datos
 */


bd.Promise = global.Promise;
bd.connect('mongodb://localhost:' + mongo_port + '/almacen').then(() => {
    // exito 
    console.log('La conexión a MongoDB se ha realizado correctamente!!');
}).catch(err => console.log(err)); // error



/**
 *  Configuracion de la App
 */


app.listen(http_port, function() {
    console.log('Servidor en la url http://localhost:' + http_port + '/');
  });


/**
 * Routes Definitions
 */
  

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Inicio" });
  });




/**
 * Server Activation
 */


// Conexión/creación a la base de datos 







