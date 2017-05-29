//Class Server
var url = require('url');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./user');
var Resources = require('./resources');

function Servidor() {

	 this.resources = new Resources();
	 this.resources.createInterval();

}

Servidor.prototype.arrancar = function( _path_files ) {

	http.listen( 3000 , function(){

	  console.log('listening on *:3000');

	});

	app.get('/', function(req, res){

			var reqResource = url.parse( req.url ).pathname;
	    var url_parts = url.parse( req.url , true );
	    var query = url_parts.query;
			res.sendFile( _path_files + '/web/index.html');

	});

	app.get('/asier', function(req, res){

			var reqResource = url.parse( req.url ).pathname;
	    var url_parts = url.parse( req.url , true );
	    var query = url_parts.query;
			res.sendFile( _path_files + '/web/asier.html');

	});

	initShockets( this );

}

function initShockets( _this ) {

	io.on('connection', function( socket ){

		console.log("----->Usuario Nuevo Conectado");

		var user;
		socket.emit('getuser');

		socket.on("setuser" ,function( json ) {
				jsonObject = JSON.parse( json );
				user = new User( socket , _this.resources );
				user.setUser( jsonObject.name , jsonObject.id );
		});

		socket.on('disconnect', function(){
			  user.disconnect();
		});

	});

}

module.exports = Servidor;
