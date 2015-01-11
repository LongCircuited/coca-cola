var thomas = require("thomas");

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.WIDTH = 64;
	this.HEIGHT = 64;
	this.image = image;
}


Player.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}


Player.prototype.move = function(dir, world, del) {
	var dx = 4 / (del);
	var dy =  4 / (del);
	var nX = this.x;
	var nY = this.y;

	if      (87 in dir) nY-=dy; 
	else if (83 in dir) nY+=dy; 
	if      (65 in dir) nX-=dx; 
	else if (68 in dir) nX+=dx; 
	if(this.checkMove(nX, this.y, world)) {
		this.x = nX; 
		
	}
	if(this.checkMove(this.x, nY, world)) {
	
		this.y = nY; 
	}
}

Player.prototype.checkMove = function(x11, y11, world) {
	// var collision = true;
	// var x0 = x11 - (64 >> 1);
	// var x1 = x0 + 64;
	// var y0 = y11 + 32 - (64 >> 1);
	// var y1 = y0 + 32;
 //    for (var y = y0; y < y1; y++) {
 //            for (var x = x0; x < x1; x++) {
 //                    if (world.getTile(Math.round(x >> 6), Math.round(y >> 6)).type == 1) collision = false;
 //            }
 //    }
	// return collision;
}

Player.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Player;