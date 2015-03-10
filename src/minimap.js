var thomas = require("thomas");

/* 
 * @param chunks {array} of chunks currently drawn
*/
function Minimap() {
	this.sX = 0;
	this.sY = 0;
	this.map = [];
}

Minimap.prototype.update = function(offX, offY, noiseGen) {
	for(var x = 0; x < 25; x++) {
		this.map[x] = [];
		for(var y = 0; y < 25; y++) {
			var r = 25;
			
			if(noiseGen.noise((x-offX/64)/r, (y-offY/64)/r) > 0.3) {
				this.map[x][y] = 1;
			} else if(noiseGen.noise((x-offX/64)/r, (y-offY/64)/r) > 0.001) {
				this.map[x][y] = 2;
			} else {
				this.map[x][y] = 0;
			}
		}
	}
}

Minimap.prototype.render = function(display) {
	for(var i = 0; i < 25; i++) {
		for(var j = 0; j < 25; j++) {
			var mapTile = this.map[i][j];
			if(mapTile == 1) {
				display.fillStyle = "blue";
				display.fillRect(i*5, j*5, 5,5);
			} else {
				display.fillStyle = "green";
				display.fillRect(i*5, j*5, 5,5);
			}
		}
	}
}



module.exports = exports = Minimap;