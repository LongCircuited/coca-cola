var thomas = require("thomas");

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

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


Enemy.prototype.update = function() {

	for (i = 0; i < 100; i++) { 
	this.x += getRandomArbitrary(-5, 5);
	this.y += getRandomArbitrary(-5, 5);
}


}


module.exports = exports = Enemy;