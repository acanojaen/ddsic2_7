module.exports = function(app) { 
    var departamento = require('./controllers/departamento.js');
    var multer  = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/pdf/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
      }
      });
    var upload = multer({ storage: storage })

    app.get('/departamento', departamento.findAll);
    app.post('/departamento', departamento.findAll);

    app.get('/nuevo_informe', departamento.nuevoInforme);
    app.post('/nuevo_informe', departamento.anadirInforme);

    app.post('/subir_archivo/:dd/:mm/:aaaa', upload.single('imageupload'),function(req, res) {
        departamento.subirArchivo(req, res)
    });

    app.post('/departamento/:dd/:mm/:aaaa', departamento.delete);
}