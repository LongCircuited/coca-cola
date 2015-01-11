var thomas = require("thomas");

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Enemy(x, y, image) {
	this.x = x;
	this.y = y;
	this.gameX = 0;
	this.gameY = 0;
	this.WIDTH = 64;
	this.HEIGHT = 64;
	this.foot = 0


	this.rect = new thomas.Rectangle(this.x, this.y, this.WIDTH, this.HEIGHT);
	this.image = image;
}

Enemy.prototype.render = function(display) {
	display.drawImage(this.image, this.x + this.gameX, this.y + this.gameY, this.WIDTH, this.HEIGHT);
}


Enemy.prototype.update = function(offX, offY) {
	this.gameX = offX;
	this.gameY = offY;
	if (this.foot ===0){
		this.y +=1
		//sets picture to ein.png
	}

	else if (this.foot ===1){
		this.y +=1
		//sets picture to ein1.png
	}

	else if (this.foot ===2){
		this.y +=1
		//sets picture to ein3.png
	}
	this.foot +=1
	
}




module.exports = exports = Enemy;