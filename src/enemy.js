var thomas = require("thomas");

function Enemy(x, y) {
	this.x = x;
	this.y = y;
	this.WIDTH = 64;
	this.HEIGHT = 64;

	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);

	this.image = new Image();
	this.image.src = "http://img2.wikia.nocookie.net/__cb20120628175715/playstationallstarsbattleroyale/images/f/ff/Pokeball.gif";
}

Player.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}


Player.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Player;