//Sistema de Colas

function Tails() {

  this.colas = new Array();
  this.attacks = new Array();

}

Tails.prototype.getUnitsForColas = function( _userName ) {

  var count = 0;

  if( this.colas.length > 0 )
  {
      for( i=0; i<this.colas.length ; i++ )
      {
        var obj = this.colas[i];
        if( _userName == obj.userName && this.colas[i].end == false )
        {
            count = count + this.colas[i].obj.num;
        }
      }

      return count;

  }
  else
  {
     return 0;
  }

}

Tails.prototype.getNumColas = function( _userName ) {

  var count = 0;

  if( this.colas.length > 0 )
  {
      for( i=0; i<this.colas.length ; i++ )
      {
        var obj = this.colas[i];
        if( _userName == obj.userName && this.colas[i].end == false )
        {
            count++;
        }
      }

      return count;

  }
  else
  {
     return 0;
  }

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
            _objec.end = true;
            console.log("Fin!");
        }

    }, 1000 );

    _objec.end = false;
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
            _objec.end = true;
        }

    }, 1000 );

    _objec.end = false;
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
            var result = result + this.attacks[i].faltan;
            var objtail;

            if( this.attacks[i].onBack == false )
            {
                if( _userName == obj.form_user )
                {
                    objtail = { "from":obj.form_user , "to":obj.to_user , "type":"Attack" , "warriors":this.attacks[i].warriors , "left":this.attacks[i].faltan };
                }
                else if( _userName == obj.to_user )
                {
                    objtail = { "from":obj.form_user , "to":obj.to_user , "type":"Attack" , "warriors":"desconocido" , "left":this.attacks[i].faltan };
                }

            }
            else if( this.attacks[i].onBack == true )
            {
                if( _userName == obj.form_user )
                {
                    objtail = { "from":obj.form_user , "to":obj.to_user , "type":"Vuelta" , "warriors":this.attacks[i].warriors , "left":this.attacks[i].faltan };
                }
                else if( _userName == obj.to_user )
                {
                    objtail = { "from":obj.form_user , "to":obj.to_user , "type":"Ocultar" , "warriors":this.attacks[i].warriors , "left":this.attacks[i].faltan };
                }
            }

            if( this.attacks[i].faltan > 1 )
            {
                returnTails.push( objtail );
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


module.exports = Tails;
