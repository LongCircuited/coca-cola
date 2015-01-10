var thomas = require('thomas');

function Tile(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	

	this.rect = new thomas.Rectangle(this.x, this.y, this.w, this.h);
}

Tile.prototype.render = function(display) {

}

Tile.prototype.update = function(delta) {


}



module.exports = exports = Tile;