var tile = require("./tile");
var noise = require("./util/noise");
var Chunk = require("./chunk");


function World() {
	this.map = [];
	this.noiseGen = new noise();
 	this.TILE_WIDTH = 64;
 	this.TILE_HEIGHT = 64;
 	this.offsetX = 0;
 	this.offsetY = 0;
 	//In chunk units
 	this.windowHeight = 10;
 	this.windowWidth = 20;
	//In tile units
 	this.chunkWidth = 13;
 	this.chunkHeight = 8;

 	this.noChunks = 100;
	this.chunks = [];
}

World.prototype.init = function(images) {
	//Initialize chunks that fill the screen
	for(var i = -this.noChunks; i < this.noChunks; i++) {
		var row = i % this.chunkWidth;
		var col = Math.floor(i / this.chunkWidth);
		this.chunks[row * this.chunkWidth + col] = new Chunk(row, col, 8, 8, this.noiseGen);
		this.chunks[row * this.chunkWidth + col].init(images);
	}


}

World.prototype.render = function(display) {
	for(var i = -this.noChunks; i < this.noChunks; i++) {
		var row = i % this.chunkWidth;
		var col = Math.floor(i / this.chunkWidth);
		this.chunks[row * this.chunkWidth + col].render(display);
	}


	// // Slam the tiles onto the screen
	// for(var i = 0; i < this.DIMENSIONS; i++) {
	// 	var row = i % this.map.length;
	// 	var col = ~~(i / this.map.length);
	// 	var tile = this.getTile(row, col);		
	// 	tile.render(display);
	// }
}
	

World.prototype.shift = function(x1, y1) {
	// Shove the map over by a few
	this.offsetX = x1;
	this.offsetY = y1;

	for(var i = -this.noChunks; i < this.noChunks; i++) {
		var row = i % this.chunkWidth;
		var col = Math.floor(i / this.chunkWidth);
		this.chunks[row * this.chunkWidth + col].shift(this.offsetX, this.offsetY);

	}

	// // Throw the values into the tiles
	// for(var x = 0; x < this.map.length; x++) {
	// 	for(var y = 0; y < this.map[x].length; y++) {
	// 		this.tiles[x * (this.DIMENSIONS) + y].shiftX = x1;
	// 		this.tiles[x * (this.DIMENSIONS) + y].shiftY = y1;
	// 	}
	// }

}



World.prototype.move = function(dir, player, del) {
	var dx = 5 / (del);
	var dy =  5 / (del);
	var nX = this.offsetX;
	var nY = this.offsetY;

	var kpc = 0;
	if      (87 in dir && ++kpc) nY+=dy; 
	else if (83 in dir && ++kpc) nY-=dy; 
	if      (65 in dir && ++kpc) nX+=dx; 
	else if (68 in dir && ++kpc) nX-=dx; 
	//if(this.checkMove(player.x - nX, player.y - this.offsetY)) {
		this.shift(nX, this.offsetY)
	//}
	//if(this.checkMove(player.x - this.offsetX, player.y - nY)) {
		this.shift(this.offsetX, nY)
	//}
}

World.prototype.checkMove = function(x11, y11) {
	var collision = true;
	x11 += 25;
	var x0 = x11 - 20 - (48 >> 1);
	var x1 = x0 + 38;
	var y0 = y11 + 32 - (64 >> 1);
	var y1 = y0 + 32;
    for (var y = y0; y < y1; y+=2) {
            for (var x = x0; x < x1; x+=2) {
                    if (this.collideable(this.getTile(Math.round(x / this.TILE_WIDTH), Math.round(y / this.TILE_HEIGHT)).type)) collision = false;
            }
    }
	return collision;
}

World.prototype.collideable = function(tId) {
	if(tId == 2 || tId == 0) {
		return false;
	} else {
		return true;
	}
}



World.prototype.getTile = function(x, y) {
	return this.tiles[x * this.DIMENSIONS + y];
}

World.prototype.onScreen = function(x, y) {
	return true;
}



module.exports = exports = World;
