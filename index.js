//Server

var schedule = require('node-schedule');
var Servidor = require('./lib/server');


/*Init server http port 3000 */
var servidor = new Servidor();
var root_path = __dirname;
servidor.arrancar( root_path );
