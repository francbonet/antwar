var globals;
// User

function User( _socket , _resources , _tails , _attacks , _informes ) {

  this.userName;
  this.userId;
  this.interval;
  this.socket_user = _socket;
  this.resources = _resources;
  this.tails = _tails;
  this.attacks = _attacks;
  this.informes = _informes;
  this.globals = require('./globals');
  this.warriorsInAttack = 0;

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

  var unidadesAttaque = this.resources.getWarriorsValueUser( jsonObject.form_user );
  if( unidadesAttaque > jsonObject.warriors )
  {
      var o = this;
      var que = this.attacks.sendWarriors( jsonObject.form_user , jsonObject.to_user , jsonObject.warriors , function( _result , _recursosRobados , _informe ) {

          console.log( "Vuelvo al Hill:" + o.userName );
          o.resources.setFoodValueUser( jsonObject.to_user , _recursosRobados );

          var que2 = o.attacks.backWarriors( jsonObject.form_user , _result , _recursosRobados , o.resources );
          que.warriors = _result;

          o.tails.addColaAttack( jsonObject.form_user , jsonObject.to_user, _result , que2 );

          //console.log("Informe:" + _informe );
          //o.socket_user.emit("onInforme" , _informe );


      });

      this.tails.addColaAttack( jsonObject.form_user , jsonObject.to_user, jsonObject.warriors , que );
      this.resources.setWarriorsValueUser( jsonObject.form_user , -jsonObject.warriors );
    }
    else
    {
        this.socket_user.emit('onError' , '{"text":"No tienes estas Unidades para atacar"}');
        return;
    }

}


User.prototype.setWorkers = function( json ) {

  var jsonObject = JSON.parse(json);
  var poblacion_user = this.resources.getWorkersValueUser( jsonObject.name ) + this.resources.getWarriorsValueUser( jsonObject.name );

  var unitsInTail = this.tails.getUnitsForColas( jsonObject.name );

  console.log("-----------------unitsInTail:" + unitsInTail );

  if( this.globals.max_poblacion < poblacion_user + jsonObject.workers + unitsInTail )
  {
      this.socket_user.emit('onError' , '{"text":"Has alcanzado maximo de poblacion"}');
      return;
  }

  var comida = this.resources.getFoodValueUser( jsonObject.name );

  if( comida >= jsonObject.workers*( this.globals.workers_price ) )
  {

    //CheckColasforthisUserº
    var numcolas = this.tails.getNumColas( jsonObject.name );
    console.log("------------------------------->numcolas Usuario:" + numcolas );

    if( numcolas < 3 )
    {

      var objtail = {"type":"workers","num":jsonObject.workers};
      var que = this.resources.createWorkers( jsonObject.name , jsonObject.workers );
      this.tails.addCola( jsonObject.name , que , objtail );

    }
    else
    {
      this.socket_user.emit('onError' , '{"text":"Has alcanzado maximo de colas"}');
    }

  }
  else
  {
    this.socket_user.emit('onError' , '{"text":"Faltan recursos"}');
  }


}

User.prototype.setwarriors = function( json ) {

  var jsonObject = JSON.parse(json);

  var poblacion_user = this.resources.getWorkersValueUser( jsonObject.name ) + this.resources.getWarriorsValueUser( jsonObject.name );

  var unitsInTail = this.tails.getUnitsForColas( jsonObject.name );

  if( this.globals.max_poblacion < poblacion_user +  jsonObject.warriors + unitsInTail )
  {
      this.socket_user.emit('onError' , '{"text":"Has alcanzado maximo de poblacion"}');
      return;
  }

  var comida = this.resources.getFoodValueUser( jsonObject.name );

  if( (comida-2) >= jsonObject.warriors*( this.globals.warrior_price ) )
  {

    var numcolas = this.tails.getNumColas(jsonObject.name );
    if( numcolas < 3 )
    {
      var objtail = {"type":"warriors","num":jsonObject.warriors};
      var que = this.resources.createWarriors( jsonObject.name , jsonObject.warriors );
      this.tails.addCola( jsonObject.name , que , objtail );
    }
    else
    {
      this.socket_user.emit('onError' , '{"text":"Has alcanzado maximo de colas"}');
    }

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
  var poblacion = valueworkers+valuewarriors

  _this.socket_user.emit( 'updateData', '{ "Maxpopulation":'+ _this.globals.max_poblacion +' , "population":'+ poblacion +' , "food":'+ valuefood +',"workers":'+ valueworkers +', "warriors":'+ valuewarriors +' , "que":'+ showTails +' , "attacks":'+ showAttackTails +' }' );

  if( valuefood <= 0) {

     clearInterval( _this.interval );
     _this.socket_user.emit('onError' , '{"text":"GAME OVER No tienes Comida"}');

  }


}


User.prototype.disconnect = function() {

  console.log( "disconnect: " + this.userName );
  clearInterval( this.interval );

}

module.exports = User;
