function Informes() {

    this.lib = new Array();

}

Informes.prototype.addInforme = function( _userName , _text ) {

  var informe = '{"name":"'+_userName +'" , "text":"'+ _text +'" }';
  this.lib.push( informe );

}

Informes.prototype.getInformes = function( _userName ) {

  if( this.lib.length > 0 )
  {
      var result = new Array();
      for( i=0 ; i < this.lib.length ; i++ )
      {
          var obj = JSON.parse( this.lib[i] );
          if( obj.name == _userName )
          {
              result.push( obj );
          }

      }

      //console.log("---------------------");
      //console.log( result );
      //console.log("---------------------");

      return result;
  }
  else
  {
    return 0;
  }

}


module.exports = Informes;
