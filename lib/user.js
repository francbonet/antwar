// User

function User( _socket , _resources , _tails , _attacks ) {

  this.userName;
  this.userId;
  this.interval;
  this.socket_user = _socket;
  this.resources = _resources;
  this.tails = _tails;
  this.attacks = _attacks;

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

User.prototype.setattack = function( json ) {

  var jsonObject = JSON.parse(json);
  console.log( jsonObject );
  var que = this.attacks.sendWarriors( jsonObject.form_user , jsonObject.to_user , jsonObject.warriors );
  this.tails.addColaAttack( jsonObject.form_user , jsonObject.to_user, jsonObject.warriors , que );
  this.resources.setWarriorsValueUser( jsonObject.form_user , -jsonObject.warriors );

}

User.prototype.setWorkers = function( json ) {

  var jsonObject = JSON.parse(json);
  var comida = this.resources.getFoodValueUser( jsonObject.name );

  if( comida >= jsonObject.workers )
  {
    var objtail = {"type":"workers","num":jsonObject.workers};
    var que = this.resources.createWorkers( jsonObject.name , jsonObject.workers );
    this.tails.addCola( jsonObject.name , que , objtail );
  }
  else
  {
    this.socket_user.emit('onError' , '{"text":"Faltan recursos"}');
  }


}

User.prototype.setwarriors = function( json ) {

  var jsonObject = JSON.parse(json);
  var comida = this.resources.getFoodValueUser( jsonObject.name );

  if( comida >= jsonObject.warriors*2 )
  {
    var objtail = {"type":"warriors","num":jsonObject.warriors};
    var que = this.resources.createWarriors( jsonObject.name , jsonObject.warriors );
    this.tails.addCola( jsonObject.name , que , objtail );
  }
  else
  {
    this.socket_user.emit('onError' , '{"text":"Faltan recursos"}');
  }

}

function updateData( _this ) {

  var valuefood = _this.resources.getFoodValueUser( _this.userName );
  var valueworkers = _this.resources.getWorkersValueUser( _this.userName );
  var valuewarriors = _this.resources.getWarriorsValueUser( _this.userName );
  var showTails = JSON.stringify( _this.tails.getCola( _this.userName ) );
  var showAttackTails = JSON.stringify( _this.tails.getColaAttack( _this.userName ) );

  _this.socket_user.emit( 'updateData', '{"food":'+ valuefood +',"workers":'+ valueworkers +', "warriors":'+ valuewarriors +' , "que":'+ showTails +' , "attacks":'+ showAttackTails +' }' );

}


User.prototype.disconnect = function() {

  console.log( "disconnect: " + this.userName );
  clearInterval( this.interval );

}

module.exports = User;
