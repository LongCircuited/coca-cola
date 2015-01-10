var thomas = require("thomas");

function Enemy(x, y, image) {
	this.x = x;
	this.y = y;
	this.WIDTH = 64;
	this.HEIGHT = 64;

	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);
	this.image = image;
}

Enemy.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}


Enemy.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Enemy;