//Sistema de Colas

function Tails() {
  this.colas = new Array();
}

Tails.prototype.addCola = function( _userName , _objec ) {

    console.log( "addCola:" + _userName +","+ _objec );
    console.log( _objec  );
    this.colas.push(1);

}


Tails.prototype.getCola = function( _userName ) {

      if( this.colas.length > 0 )
      {
          return JSON.parse( this.colas[0] );
      }
      else
      {
         return 0;
      }

}

function getTimeLeft( _timeout ) {

    return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);

}

module.exports = Tails;
