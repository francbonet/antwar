// User

function User( _socket , _resources , _tails ) {

  this.userName;
  this.userId;
  this.interval;
  this.points = 0;
  this.socket_user = _socket;
  this.resources = _resources;
  this.tails = _tails;

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

User.prototype.setWorkers = function( json ) {
  var jsonObject = JSON.parse(json);
  console.log( "------>" );
  console.log( jsonObject );

  /*
  this.resources.setFoodValueUser( jsonObject.name , jsonObject.workers );
  this.resources.setWorkersValueUser( jsonObject.name , jsonObject.workers );
  */

  var que = this.resources.createWorkers( jsonObject.name , jsonObject.workers );
  this.tails.addCola( jsonObject.name , que );

}

User.prototype.setwarriors = function( json ) {

  var jsonObject = JSON.parse(json);
  var que = this.resources.createWarriors( jsonObject.name , jsonObject.warriors );
  this.tails.addCola( jsonObject.name , que );

}

function updateData( _this ) {

  var valuefood = _this.resources.getFoodValueUser( _this.userName );
  var valueworkers = _this.resources.getWorkersValueUser( _this.userName );
  var valuewarriors = _this.resources.getWarriorsValueUser( _this.userName );
  var showTails = _this.tails.getCola( _this.userName );
  _this.socket_user.emit('updateData', '{"food":'+ valuefood +',"workers":'+ valueworkers +', "warriors":'+ valuewarriors +' , "que":'+ showTails +' }' );

}


User.prototype.disconnect = function() {

  console.log( "disconnect: " + this.userName );
  clearInterval( this.interval );

}

module.exports = User;
