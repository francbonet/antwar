//Sistema de Colas

function Tails() {
  this.colas = new Array();
}

Tails.prototype.addCola = function( _userName , _objec ) {

    console.log( "addCola:" + _userName +","+ _objec );
    this.colas.push( _objec );

}


Tails.prototype.getCola = function( _userName ) {

      return 0;

}

module.exports = Tails;
