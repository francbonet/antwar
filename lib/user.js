// User
var userName;
var userId;
var socket;


function User( _socket ) {

  socket = _socket;

}

User.prototype.setUser = function( _name , _id ) {

  userName = _name;
  userId = _id;

  socket.name = _name;
  socket.id = _name;

  console.log( "user:" +  _name );
  console.log( "id:" + _id );

  socket.emit('getuser');

}

User.prototype.setSocket = function( _socket ) {

}

module.exports = User;
