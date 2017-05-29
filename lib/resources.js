
//Resources
function Resources() {

    this.users_data = JSON.parse('[{"name":"franc","food":10 , "workers":0 , "warriors":0 },{"name":"asier","food":10, "workers":0 , "warriors":0 }]');

}

Resources.prototype.createInterval = function() {

  var o = this;
  this.interval = setInterval( function() {

    updateData( o );

  } , 10000 );

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

Resources.prototype.createWarriors = function( _userName , _num ) {

    //setFoodValueUser( _userName , _num*2 );
    console.log("createWarriors");
    for( i=0 ; i< this.users_data.length ; i++ )
    {
        var user_node = this.users_data[i];
        var name = user_node.name;
        if( name == _userName )
        {
            user_node.food = user_node.food - (_num*2 );
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
              console.log( "user_node.workers:" + user_node.warriors );
          }
      }

    } , 10000 );

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

function updateData( _this ) {

  for( i=0 ; i<_this.users_data.length ; i++ )
  {
      var user_node = _this.users_data[i];
      user_node.food = ( user_node.food + user_node.workers );
  }

}

module.exports = Resources;
