module.exports = function(app) { 
    var departamento = require('./controllers/departamento.js');
    var multer  = require('multer');
    var path = require('path');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/pdf/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
      }
      });
    var upload = multer({ storage: storage,
                          fileFilter: function(req, file, callback) {
                            var ext = path.extname(file.originalname);
                            if(ext !== '.pdf'){
                                return callback(new Error('Solo se permite añadir archivos PDF'), false);
                            }
                            
                            callback(null, true);
                          }
    });

    app.get('/departamento', departamento.findAll);
    app.get('/filtrar', departamento.findTipo);
    app.post('/departamento', departamento.findAll);

    app.get('/nuevo_informe', departamento.nuevoInforme);
    app.post('/nuevo_informe', departamento.anadirInforme);

    app.post('/subir_archivo/:dd/:mm/:aaaa', upload.single('imageupload'),function(req, res) {
        departamento.subirArchivo(req, res)
    });

    app.post('/departamento/:dd/:mm/:aaaa', departamento.delete);
}