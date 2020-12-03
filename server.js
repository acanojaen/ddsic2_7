'use strict'

var bd = require('mongoose');

bd.Promise = global.Promise;


bd.connect('mongodb://localhost:27017/almacen').then(() => {
    // exito 
    console.log('La conexión a MongoDB se ha realizado correctamente!!');
}).catch(err => console.log(err)); // error
