const express = require('express');
const common = require('../common')
const path = require('path');
const router = express.Router();
const methodOverride = require('method-override');
const types = ["", "Consejo de Departamento", "Junta de Direccion", "Junta de Comisiones"]
router.use(methodOverride('_method'));

// Listar todos los informes de departamento:

exports.findAll = function(req, res){  
    common.informes_departamento.find({}).toArray(function(err, inf) {
        if (err) {
            res.send(err);
        } else if (inf.length) {
            res.render('departamento', {
                'informes': inf, datalist: types,
            });
        } else {
            res.render('error', {error: 'No hay ningún informe de departamento existente.'});
        }
      });  
};

exports.anadirInforme = function(req, res){  
    common.informes_departamento.findOne({"fecha":req.body.fecha}).then(
        function(informe) {
            if(informe != null)
            res.render('error', {error: 'Ya existe un informe con esa fecha.'});
            else if(req.body.selectpick == ""){
                res.render('error', {error: 'Es necesario seleccionar tipo de informe.'});
            } else {
                if(req.body.nombre != null && req.body.dni != null){  
                    common.informes_departamento.insertOne({"fecha":req.body.fecha, "tipo": req.body.selectpick, "nombre":req.body.nombre, "dni_admin": req.body.dni, "URL": ""}, 
                    function(err, inserted) {
                        res.redirect('/departamento');
                    });
                } else {
                    res.render('error', {error: 'Campos incorrectos'});
                }
            }},
      function(err) { console.log(err) }
    );
};

exports.findTipo = function(req, res){
    common.informes_departamento.find({"tipo":req.query.selectpick}).toArray(function(err, inf) {
        if (err) {
            res.send(err);
        } else if (inf.length) {
            res.render('departamento', {
                'informes': inf, datalist: types,
            });
        } else {
            res.render('error', {error: 'Necesitas seleccionar un tipo para filtrar o no existe ningun documento para esa categoria'});
        }
      });  
};

exports.delete = function(req, res){
    deleteParam = req.params.dd + "/" + req.params.mm + "/" + req.params.aaaa;
    common.informes_departamento.deleteOne({"fecha": deleteParam}, function(err, results) {
        if (err){
            console.log("failed");
            throw err;
        }
        res.redirect('/departamento');
    });
};

exports.subirArchivo = function(req, res){
    fecha_nuevo = req.params.dd + "/" + req.params.mm + "/" + req.params.aaaa;
    console.log(req.body)
    var url = "http://localhost:8080/pdf/" + req.file.filename;
    var newvalue = { $set: {URL: url} };
    common.informes_departamento.findOneAndUpdate({"fecha": fecha_nuevo}, newvalue, function(err, updated) {
        if(err) {
            console.log("failed");
            throw err;
        } else {
            res.redirect('/departamento');
        }
    });
}

exports.nuevoInforme = function(req, res){
    res.render('nuevo_informe', {title: 'Añadir informe departamento', datalist: types});
}
