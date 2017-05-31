//Class Server
var url = require('url');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./user');
var Resources = require('./resources');
var Tails = require('./tails');
var Attacks = require('./attacks');

function Servidor() {

	 this.resources = new Resources();
	 this.resources.createInterval();
	 this.tails = new Tails();
	 this.attacks = new Attacks( this.resources );

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

	app.get('/css/main.css', function(req, res){

			var reqResource = url.parse( req.url ).pathname;
			var url_parts = url.parse( req.url , true );
			var query = url_parts.query;
			res.sendFile( _path_files + '/web/css/main.css');

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
				user = new User( socket , _this.resources , _this.tails, _this.attacks );
				user.setUser( jsonObject.name , jsonObject.id );
		});

		socket.on("setworkers" , function( json ) {
				user.setWorkers( json );
		});

		socket.on("setwarriors" , function( json ) {
				user.setwarriors( json );
		});

		socket.on("setattack" , function( json ) {
				user.setattack( json );
		});



		socket.on('disconnect', function(){
			  user.disconnect();
		});

	});

}

module.exports = Servidor;
