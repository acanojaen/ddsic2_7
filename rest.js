var mongodb = require('mongodb');
var common = require('./common');
var lib = require('./lib')

var rest = module.exports = {
    departamento: function(req, rep, query, payload) {
        switch(req.method){
            case 'GET':
                common.informes_departamento.find({}).toArray(function(err, docs) {
                    if(err) {
                        lib.sendJSON(rep, 400, 'Find failed', err);
                    } else {
                        lib.sendJSON(rep, 200, 'OK', docs);
                    }
                })




        }
    }




}