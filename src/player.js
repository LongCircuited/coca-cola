var thomas = require("thomas");

function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.WIDTH = 52;
	this.HEIGHT = 52;

	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);

	this.image = image;
	
}

Player.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}

Player.prototype.move = function(dir, tiles, world) {
	
	var mX = 0, mY = 0;
	if(37 in dir) { 
		mX += -5; 
	} else if(39 in dir) { 
		mX = 5;
	};
	if(38 in dir) { 
		mY = -5; 
	} else if(40 in dir) { 
		mY = 5;
	};
	var movementRect = new thomas.Rectangle(this.x + mX, this.y + mY, this.WIDTH, this.HEIGHT);
	var nextTile = tiles[Math.floor((this.x + mX) / 64) * world.DIMENSIONS + Math.floor((this.y + mY) / 64)];
var nextTile1 = tiles[Math.ceil((this.x + mX) / 64) * world.DIMENSIONS + Math.floor((this.y + mY) / 64)];
var nextTile2 = tiles[Math.floor((this.x + mX) / 64) * world.DIMENSIONS + Math.ceil((this.y + mY) / 64)];
var nextTile3 = tiles[Math.ceil((this.x + mX) / 64) * world.DIMENSIONS + Math.ceil((this.y + mY) / 64)];
	if(!movementRect.intersects(nextTile.rect) == true && !nextTile.type == 1 && !nextTile1.type == 1 && !nextTile2.type == 1 && !nextTile3.type == 1) {
		this.x += mX;
		this.y += mY;
	}
}

Player.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Player;