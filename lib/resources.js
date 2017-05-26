

function Resources() {

    this.users_data = JSON.parse('[{"name":"franc","food":0 , "workers":5 },{"name":"asier","food":0, "workers":2 }]');

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

function updateData( _this ) {

  for( i=0 ; i<_this.users_data.length ; i++ )
  {
      var user_node = _this.users_data[i];
      user_node.food = ( user_node.food + user_node.workers );
      //console.log( user_node.name + "/" + user_node.food );
  }

}

module.exports = Resources;
