//Sistema de Colas

function Tails() {
  this.colas = new Array();
}

Tails.prototype.addCola = function( _userName , _objec ) {


    console.log( "addCola:" + _userName +","+ _objec );
    /*
    this.colas.push( _objec );
    setInterval( function () {
      console.log( "Falta:" + Math.ceil(( _objec._idleStart + _objec._idleTimeout - Date.now()) / 1000 ) );
    } , 1000 );
    */

    console.log( Date.now() );

    var timeout = setTimeout(function() {}, 10000 );
    setInterval(function() {
        console.log('Time left: '+getTimeLeft(timeout)+'s');
    }, 1000);


}

function getTimeLeft( _timeout ) {

    return Math.ceil(( _timeout._idleStart + _timeout._idleTimeout - Date.now()) / 1000 );

}

Tails.prototype.getCola = function( _userName ) {

      if( this.colas.length > 0 )
      {
          return 1;
      }
      else
      {
         return 0;
      }

}

/*
function getTimeLeft( _timeout ) {

    return Math.ceil(( timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000 );

}
*/

module.exports = Tails;
