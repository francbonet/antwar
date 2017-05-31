

function Attacks( _resources) {

  this.resources = _resources;
  this.informes = new Array();

}

Attacks.prototype.sendWarriors = function( _userA , _userB , _warriors ) {

  var o = this;
  this.timeout = setTimeout( function() {

      console.log( "userA:" +  o.resources.getWarriorsValueUser( _userA ) );
      console.log( "userB:" +  o.resources.getWarriorsValueUser( _userB ) );

  } , 10000 );
  this.timeout.now = Date.now();
  return this.timeout;

}

module.exports = Attacks;
