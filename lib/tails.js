//Sistema de Colas

function Tails() {
  this.colas = new Array();
}

Tails.prototype.addCola = function( _userName , _objec ) {

    console.log( "addCola:" + _userName );

    var o=this;
    var timeout;

    var kill = setInterval(function() {

        console.log('Time left: '+ getTimeLeft( _objec ) +'s');
        _objec.faltan = getTimeLeft( _objec );
        if( getTimeLeft( _objec ) <= 0 )
        {
            clearInterval( kill );
            console.log("Fin!");
        }

    }, 1000 );

    _objec.userName = _userName;
    this.colas.push( _objec );

    /*
    timeout = setTimeout( function() {
      console.log("Kill:" + kill );
      clearInterval( kill );
    }, _objec._idleTimeout );
    */

}

function getTimeLeft( _timeout ) {

    var hapasado = ( Date.now() - _timeout.now );
    return ( ( _timeout._idleTimeout - hapasado ) / 1000 );

}

Tails.prototype.getCola = function( _userName ) {

      if( this.colas.length > 0 )
      {
          var result = 0;
          for( i=0; i<this.colas.length ; i++ )
          {
            var obj = this.colas[i];
            if( _userName == obj.userName )
            {
               result = result + this.colas[i].faltan;
            }
          }
          return result;

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
