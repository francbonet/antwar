// User

function User( _socket ) {

  this.userName;
  this.userId;
  this.interval;
  this.points = 0;
  this.socket_user = _socket;

}

User.prototype.setUser = function( _name , _id ) {

  this.userName = _name;
  this.userId = _id;

  this.socket_user.name = _name;
  this.socket_user.id = _name;

  console.log( "user:" +  this.userName );
  console.log( "id:" + this.userId );

  var o = this;

  this.interval = setInterval( function() {

    updateData( o );

  } , 1000 );

}

function updateData( _this ) {

  _this.socket_user.emit('updateData', '{"points":'+ _this.points +'}' );
  _this.points++;

}

User.prototype.disconnect = function() {

  console.log( "disconnect: " + this.userName );
  clearInterval( this.interval );

}

module.exports = User;
