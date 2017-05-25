//Class Server
var url = require('url');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function Servidor() {
}

Servidor.prototype.arrancar = function( _path_files ) {

	http.listen( 3000 , function(){

	  console.log('listening on *:3000');
		
	});

	/* Get index,html */
	app.get('/', function(req, res){

	    var url_parts = url.parse( req.url , true );
	    var query = url_parts.query;
	    res.sendFile( _path_files + '/web/index.html');

	});

	initShockets();

}

function initShockets() {

	io.on('connection', function( socket ){

		console.log("Usuario Conectado");

	});

}

module.exports = Servidor;
