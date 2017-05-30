//Sistema de Colas

function Tails() {

  this.colas = new Array();
  this.attacks = new Array();

}

Tails.prototype.addColaAttack = function( _form_user , _to_user , _warriors , _objec ) {

    console.log( "addColaAttack:" + _warriors );

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

    _objec.form_user = _form_user;
    _objec.to_user = _to_user;
    _objec.warriors = _warriors;
    _objec.faltan = ( _objec._idleTimeout/1000 );

    this.attacks.push( _objec );

}

Tails.prototype.addCola = function( _userName , _objec , _obj ) {

    console.log( "addCola:" + _obj );

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
    _objec.obj = _obj;
    _objec.faltan = ( _objec._idleTimeout/1000 );

    this.colas.push( _objec );

}

function getTimeLeft( _timeout ) {

    var hapasado = ( Date.now() - _timeout.now );
    return ( ( _timeout._idleTimeout - hapasado ) / 1000 );

}

Tails.prototype.getColaAttack = function( _userName ) {

      if( this.attacks.length > 0 )
      {
          var result = 0;
          var returnTails = new Array();

          for( i=0; i<this.attacks.length ; i++ )
          {
            var obj = this.attacks[i];
            if( _userName == obj.form_user || _userName == obj.to_user )
            {
               result = result + this.attacks[i].faltan;

               var objtail;

               if( _userName == obj.form_user )
               {
                  objtail = { "type":"Attack" , "warriors":this.attacks[i].warriors , "left":this.attacks[i].faltan };
               }
               else
               {
                  objtail = { "type":"Attack" , "warriors":"desconocido" , "left":this.attacks[i].faltan };
               }

               if( this.attacks[i].faltan >= 0 )
               {
                  returnTails.push( objtail );
               }

            }
          }

          return returnTails;

      }
      else
      {
         return 0;
      }

}

Tails.prototype.getCola = function( _userName ) {

      if( this.colas.length > 0 )
      {
          var result = 0;
          var returnTails = new Array();

          for( i=0; i<this.colas.length ; i++ )
          {
            var obj = this.colas[i];
            if( _userName == obj.userName )
            {
               result = result + this.colas[i].faltan;
               var objtail = {"type":this.colas[i].obj.type ,"num":this.colas[i].obj.num , "left":this.colas[i].faltan };

               if( this.colas[i].faltan >= 0 )
               {
                  returnTails.push( objtail );
               }

            }
          }

          return returnTails;

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
