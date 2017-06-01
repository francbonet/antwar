var globals;


//Resources
function Resources() {

    this.users_data = JSON.parse('[{"name":"franc","food":10 , "workers":0 , "warriors":0 },{"name":"asier","food":10, "workers":0 , "warriors":0 },{"name":"jaume","food":10, "workers":0 , "warriors":0 }]');
    this.globals = require('./globals');
}

Resources.prototype.createInterval = function() {

  var o = this;
  this.interval = setInterval( function() {

    updateData( o );

  } , this.globals.time_create_update );

}

Resources.prototype.getFoodValueUser = function( _userName ) {

  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          return user_node.food;
      }
  }

}

Resources.prototype.createWorkers = function( _userName , _num ) {

    //setFoodValueUser( _userName , _num*2 );
    console.log("createWorkers");

    for( i=0 ; i< this.users_data.length ; i++ )
    {
        var user_node = this.users_data[i];
        var name = user_node.name;
        if( name == _userName )
        {
            user_node.food = user_node.food - (_num * this.globals.workers_price );
            console.log( "user_node.food:" + user_node.food );
        }
    }

    var o = this;
    this.timeout = setTimeout( function() {

      for( i=0 ; i< o.users_data.length ; i++ )
      {
          var user_node = o.users_data[i];
          var name = user_node.name;
          if( name == _userName )
          {
              user_node.workers = user_node.workers + _num;
              console.log( "user_node.workers:" + user_node.workers );
          }
      }

    } , this.globals.time_create_workers * _num );
    this.timeout.now = Date.now();

    return this.timeout;

}

Resources.prototype.createWarriors = function( _userName , _num ) {

    //setFoodValueUser( _userName , _num*2 );
    console.log("createWarriors");

    for( i=0 ; i< this.users_data.length ; i++ )
    {
        var user_node = this.users_data[i];
        var name = user_node.name;
        if( name == _userName )
        {
            user_node.food = user_node.food - ( _num * this.globals.warrior_price );
            console.log( "user_node.food:" + user_node.food );
        }
    }

    var o = this;
    this.timeout = setTimeout( function() {

      for( i=0 ; i< o.users_data.length ; i++ )
      {
          var user_node = o.users_data[i];
          var name = user_node.name;
          if( name == _userName )
          {
              user_node.warriors = user_node.warriors + _num;
              console.log( "user_node.warriors:" + user_node.warriors );
          }
      }

    } , this.globals.time_create_warriors *_num );
    this.timeout.now = Date.now();

    return this.timeout;

}



Resources.prototype.setWorkersValueUser = function( _userName , _num ) {

  console.log("setWorkersValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          user_node.workers = user_node.workers + _num;
          console.log( "user_node.workers:" + user_node.workers );
      }
  }

}

Resources.prototype.setWarriorsValueUser = function( _userName , _num ) {

  console.log("setWarriorsValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          if( ( user_node.warriors + user_node.workers ) + _num <= this.globals.max_poblacion )
          {
              user_node.warriors = user_node.warriors + _num;
              console.log( "user_node.warriors:" + user_node.warriors );
          }
      }
  }

}

Resources.prototype.setWarriors = function( _userName , _num ) {

  console.log("setWarriorsValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          user_node.warriors = _num;
          console.log( "user_node.warriors:" + user_node.warriors );
      }
  }

}

Resources.prototype.setKillWorkers = function( _userName , _num ) {

  console.log("setWarriorsValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          user_node.workers = user_node.workers - _num;
          if( user_node.workers < 0 )
          {
            user_node.workers = 0;
          }
          console.log( "setKillWorkers:" + user_node.workers );
      }
  }

}

Resources.prototype.getWarriorsValueUser = function( _userName ) {

  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          return user_node.warriors;
      }
  }

}

Resources.prototype.getWorkersValueUser = function( _userName ) {

  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          return user_node.workers;
      }
  }

}

Resources.prototype.setFoodValueUser = function( _userName , _num ) {

  console.log("setFoodValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          user_node.food = user_node.food - _num;
          console.log( "user_node.food:" + user_node.food );
      }
  }

}

Resources.prototype.addFoodValueUser = function( _userName , _num ) {

  console.log("setFoodValueUser");
  for( i=0 ; i< this.users_data.length ; i++ )
  {
      var user_node = this.users_data[i];
      var name = user_node.name;
      if( name == _userName )
      {
          user_node.food = user_node.food + _num;
          console.log( "user_node.food:" + user_node.food );
      }
  }

}

function updateData( _this ) {

  //console.log("updateData");
  for( i=0 ; i<_this.users_data.length ; i++ )
  {
      var user_node = _this.users_data[i];
      if( ( user_node.food + user_node.workers ) < _this.globals.max_food )
      {
        user_node.food = ( user_node.food + user_node.workers );
      }
      else
      {
        user_node.food = _this.globals.max_food;
      }
  }

}

module.exports = Resources;
