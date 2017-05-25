//Server

var schedule = require('node-schedule');
var Servidor = require('./lib/server');


/*Init server http port 3000 */
/*Nose*/ 

var servidor = new Servidor();
servidor.arrancar(  __dirname );
