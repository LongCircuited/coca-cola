var thomas = require("thomas");

function Player(x, y) {
	this.x = x;
	this.y = y;
	this.WIDTH = 64;
	this.HEIGHT = 64;

	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);

	this.image = new Image();
	this.image.src = "http://upload.wikimedia.org/wikipedia/commons/f/f3/Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg";
}

Player.prototype.render = function(display) {
	display.drawImage(this.image, this.x, this.y, this.WIDTH, this.HEIGHT);
}


Player.prototype.update = function(x, y) {
	this.x += x;
	this.y += y;

}


module.exports = exports = Player;