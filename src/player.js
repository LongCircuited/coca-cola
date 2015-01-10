var thomas = require("thomas");

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.WIDTH = 64;
	this.HEIGHT = 64;

	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);

	this.image = image;
	
}

Player.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}

Player.prototype.move = function(dir, world, del) {
  var dx = Math.round(5 * del);
  var dy =  Math.round(5 * del);
  var nX = this.x;
  var nY = this.y;

  if      (87 in dir) nY-=dy; 
  else if (83 in dir) nY+=dy; 
  if      (65 in dir) nX-=dx; 
  else if (68 in dir) nX+=dx; 
  if(this.checkMove(nX, nY, world)) {
     this.x = nX; 
     this.y = nY; 
  }
}

Player.prototype.checkMove = function(x11, y11, world) {
	  var collision = true;
	  	var x0 = x11 - (64 >> 1);
        var x1 = x0 + 64;
        var y0 = y11 - (64 >> 1);
        var y1 = y0 + 64;
       
        for (var y = y0; y < y1; y++) {
                for (var x = x0; x < x1; x++) {
                        if (world.getTile(Math.round(x / 64), Math.round(y / 64)).type == 1) collision = false;
                }
        }

return collision;
	// var tX = Math.floor(x1 / world.TILE_WIDTH);
	// var tY = Math.floor(x1 / world.TILE_HEIGHT);
	// var tile1 = world.getTile(tX, tY);
	// if(tile1.type == 1) return false
	// tX = Math.floor((x1 + world.TILE_WIDTH) / world.TILE_WIDTH);
	// tY = Math.floor((y1 + world.TILE_HEIGHT) / world.TILE_HEIGHT);
	// tile1 = world.getTile(tX, tY);
	// if(tile1.type == 1) return false
	// return true;

	// if(level[Math.floor(x/20)][Math.floor(y/20)] == 1 || level[Math.ceil(x/20)][Math.floor(y/20)] == 1 || level[Math.floor(x/20)][Math.ceil(y/20)] == 1 || level[Math.ceil(x/20)][Math.ceil(y/20)] == 1) {
	// 	return false;
	// } else {
	// 	return true;
	// }
}

Player.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Player;