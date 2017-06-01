var globals = require('./globals');

function Attacks( _resources) {

  this.resources = _resources;
  this.globals = require('./globals');
  this.informes = new Array();

}

Attacks.prototype.sendWarriors = function( _userA , _userB , _warriors , _callback ) {

  var o = this;
  this.timeout = setTimeout( function() {

      console.log("¡Han llegado a:" + _userB );

      console.log( "---------->time_users_attack:" + o.globals.time_users_attack );

      var warriorsA = _warriors //o.resources.getWarriorsValueUser( _userA );
      var warriorsB = o.resources.getWarriorsValueUser( _userB );

                                                                                //tirada de dados

                                                                                var resultwarriors;
                                                                                var recursosRobados;
                                                                                var informe;

                                                                                var resultA = 0;
                                                                                if( warriorsB > 0 )
                                                                                {

                                                                                  for( i=0 ; i<warriorsA ; i++ )
                                                                                  {
                                                                                      var dados = Math.random()*1;
                                                                                      dados = Math.round( dados );
                                                                                      resultA = resultA + dados;
                                                                                  }

                                                                                }
                                                                                else
                                                                                {
                                                                                    resultA = warriorsA;
                                                                                }

                                                                                var resultB = 0;
                                                                                for( i=0 ; i<warriorsB ; i++ )
                                                                                {
                                                                                    var dados = Math.random()*1;
                                                                                    dados = Math.round( dados );
                                                                                    resultB = resultB + dados;
                                                                                }

                                                                                console.log("resultA:" + resultA + " | resultB:" + resultB );


                                                                                if( resultA > resultB )
                                                                                {
                                                                                    console.log("User Win:" + _userA );
                                                                                    console.log("resto:" + ( resultA - resultB ) );

                                                                                    resultwarriors = 0;
                                                                                    recursosRobados = 0;

                                                                                    var resto = ( resultA - resultB );

                                                                                    resultwarriors = resto;
                                                                                    recursosRobados = resultwarriors;

                                                                                    recursosActuales = o.resources.getFoodValueUser( _userB );

                                                                                    var recursos_robados_final;
                                                                                    var isgameOver = false;

                                                                                    if( recursosActuales > recursosRobados )
                                                                                    {
                                                                                      recursosActuales = recursosRobados;
                                                                                      o.resources.setFoodValueUser( _userB , recursosRobados );
                                                                                      recursos_robados_final = recursosRobados;
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                      recursosRobados = recursosActuales;
                                                                                      o.resources.setFoodValueUser( _userB , 0 );
                                                                                      recursos_robados_final = recursosActuales;
                                                                                      isgameOver = true
                                                                                    }

                                                                                    o.resources.setWarriors( _userB , 0 );

                                                                                    var workers_actuales = o.resources.getWorkersValueUser( _userB );
                                                                                    var workers_killed = 0;
                                                                                    if( workers_actuales > (resultwarriors*2) )
                                                                                    {
                                                                                        workers_killed = (resultwarriors*2)
                                                                                        o.resources.setKillWorkers( _userB , (resultwarriors*2) );
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        workers_killed = workers_actuales;
                                                                                        o.resources.setKillWorkers( _userB , workers_actuales );
                                                                                    }


                                                                                    if( ( o.resources.getFoodValueUser( _userB ) - (recursos_robados_final*2) ) <= 0 )
                                                                                    {
                                                                                      informe = '{"text":"Atacante: <b>'+ _userA +'</b> Defensor:<b>'+ _userB +'</b>, '+ _userA +' ha sufrido '+ (warriorsA-resultwarriors) +' bajas. '+ _userB +' ha sufrido '+ warriorsB +' bajas en warriors y '+ workers_killed +' bajas en workers. '+ _userA +' ha saqueado '+ recursos_robados_final*2 +' recursos en comida. El ganador de la batalla es '+ _userA +'. <b>Game Over del jugador '+ _userB +'</b>" }';
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                      informe = '{"text":"Atacante: <b>'+ _userA +'</b> Defensor:<b>'+ _userB +'</b>, '+ _userA +' ha sufrido '+ (warriorsA-resultwarriors) +' bajas. '+ _userB +' ha sufrido '+ warriorsB +' bajas en warriors y '+ workers_killed +' bajas en workers. '+ _userA +' ha saqueado '+ recursos_robados_final +' recursos en comida. El ganador de la batalla es '+ _userA +'." }';
                                                                                    }

                                                                                }
                                                                                else if( resultA < resultB ) {

                                                                                    console.log("User Win:" + _userB );
                                                                                    console.log("resto:" + ( resultB - resultA ) );

                                                                                    resultwarriors = 0;
                                                                                    recursosRobados = 0;

                                                                                    var resto = ( resultB - resultA );
                                                                                    o.resources.setWarriors( _userB , resto );


                                                                                    var actual_warriorsUserB = o.resources.getWarriorsValueUser( _userB );

                                                                                    //informe = '{"text":"Has Atacado a '+ _userB +' con '+ warriorsA +' Warriors y le has matado '+ ( actual_warriorsUserB-resto ) +' warriors y '+ (resultwarriors*2) +' workers y le has robado '+ recursos_robados_final +' comida eres el Perdedor de la Batalla"}';
                                                                                    informe = '{"text":"Atacante:<b>'+ _userA +'</b> Defensor:<b>'+ _userB +'</b>, '+ _userA +' ha sufrido '+ (warriorsA-resultwarriors) +' bajas. '+ _userB +' ha sufrido '+ (actual_warriorsUserB-resto) +' bajas en warriors y '+ (resultwarriors*2) +' bajas en workers. '+ _userA +' ha saqueado '+ recursosRobados +' recursos en comida. El ganador de la batalla es '+ _userB +'." }';

                                                                                }
                                                                                else
                                                                                {
                                                                                    console.log("Empate");
                                                                                    console.log("resto:" + ( resultA - resultB ) );

                                                                                    resultwarriors = 0;
                                                                                    recursosRobados = 0;
                                                                                    o.resources.setWarriors( _userB , 0 );

                                                                                    workers_killed = 0;
                                                                                    recursos_robados_final = 0;

                                                                                    informe = '{"text":"Atacante:<b>'+ _userA +'</b> Defensor:<b>'+ _userB +'</b>, '+ _userA +' ha sufrido '+ (warriorsA-resultwarriors) +' bajas. '+ _userB +' ha sufrido '+ warriorsB +' bajas en warriors y '+ workers_killed +' bajas en workers. '+ _userA +' ha saqueado '+ recursos_robados_final +' recursos en comida. Esto es un empate." }';

                                                                                }

      //Logica del Attaque//
      //Quitar recursos al defensor//
      //Quitar warriors al atacante//

      //var resultwarriors = _warriors-1;
      //var recursosRobados = 10;

      _callback( resultwarriors , recursosRobados , informe );


  } , this.globals.time_users_attack );
  this.timeout.onBack = false;
  this.timeout.now = Date.now();
  return this.timeout;

}

Attacks.prototype.backWarriors = function( _userA , _warriors , _recursosRobados , _resourcesUser ) {

  console.log("backWarriors name:" + _userA );
  console.log("backWarriors warriors:" + _warriors );

  var o = this;
  this.timeout = setTimeout( function() {

      console.log("¡Han llegado a Casa!");
      _resourcesUser.setWarriorsValueUser( _userA , _warriors );
      _resourcesUser.addFoodValueUser( _userA , _recursosRobados );

  } , this.globals.time_users_attack );


  this.timeout.onBack = true;
  this.timeout.now = Date.now();
  return this.timeout;

}

module.exports = Attacks;
