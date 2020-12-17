var common = require('./common');
var rest = require('./rest');

var lib = module.exports = {
    sendJSON: function(rep, code, desc, obj) {
        rep.writeHead(code, desc, {'Content-type' : 'application/json'});
        rep.end(JSON.stringify(obj));
    }
}