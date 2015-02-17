var tile = require("./tile");
var noise = require("./util/noise");
var Chunk = require("./chunk");


function World() {
	this.map = [];
	this.noiseGen = new noise();
 	this.TILE_WIDTH = 64;
 	this.TILE_HEIGHT = 64;
 	this.offsetX = 40;
 	this.offsetY = 26;
 	//In chunk units
 	this.windowHeight = 10;
 	this.windowWidth = 20;
	//In tile units
 	this.chunkWidth = 13;
 	this.chunkHeight = 8;
 	this.noChunks = 3;
 	this.factor = 4;
 	this.count = 0;
	this.chunks = [];
	this.images = null;
}

World.prototype.init = function(images) {
	this.images = images;
	//Initialize chunks that fill the screen
	for(var x = -this.noChunks; x <= this.noChunks; x++) {
		for(var y = -this.noChunks; y <= this.noChunks; y++) {
			this.chunks[this.count++] = new Chunk(x + this.offsetX/this.TILE_WIDTH, y + this.offsetY/this.TILE_HEIGHT, 8, 8, this.noiseGen);
			this.chunks[this.count - 1].init(images);
		}
	}
}

World.prototype.manageChunks = function() {
	// var remove = this.checkRemove();
	// var add = [];
	// if(remove.length == 0) return true;
	// //Calculate where to add chunks
	// for(var i = 0; i < remove.length; i++) {
	// 	var oldChunk = this.chunks[remove[i]];
	// 	var newChunk = new Chunk(-oldChunk.x + 1, -oldChunk.y, 8, 8, this.noiseGen);
	// 	newChunk.init(this.images);
	// 	add[i] = newChunk;
	// }
	// //Swap them out
	// for(var i = 0; i < this.chunks.length; i++) {
	// 	for(var j = 0; j < remove.length; j++) {
	// 		if(i == remove[j]) {
	// 			this.chunks[i] = add[j];
	// 		}
	// 	}
	// }

	for(var i = 0; i < this.count; i++) {
		var chunk = this.chunks[i];
		if(chunk.offScreen() == "lateral-l") {
				chunk.x += this.noChunks * 2;
				chunk.init(this.images);
				if(chunk.offScreen()) {
					break;
				}
		} else if(chunk.offScreen() == "lateral-r") {
				chunk.x -= this.noChunks * 2;
				chunk.init(this.images);
				if(chunk.offScreen()) {
					break;
				}
		} else if(chunk.offScreen() == "vertical-u") {

				chunk.y += this.noChunks * 2;
				chunk.init(this.images);
				if(chunk.offScreen()) {
					break;
				}
		} else if(chunk.offScreen() == "vertical-d") {

				chunk.y -= this.noChunks * 2;
				chunk.init(this.images);
				if(chunk.offScreen()) {
					break;
				}
		}
	}

}

World.prototype.render = function(display) {
	// Slam the tiles onto the screen
	for(var i = 0; i < this.count; i++) {
		if(!this.chunks[i].offScreen()) {
			this.chunks[i].render(display);
		}
	}
}
	
World.prototype.checkRemove = function() {
	var removeList = [];
	for(var i = 0; i < this.count; i++) {
		if(this.chunks[i].offScreen()) {
			//Push the index of the chunks to remove this tick
			removeList.push(i);
		}
	}
	return removeList;
}

World.prototype.shift = function(x1, y1) {
	// Shove the map over by a few
	this.offsetX = x1;
	this.offsetY = y1;
	for(var i = 0; i < this.count; i++) {
		this.chunks[i].shift(this.offsetX, this.offsetY);
	}
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
	if(this.checkMove(player.x - nX, player.y - this.offsetY)) {
		this.shift(nX, this.offsetY)
	}
	if(this.checkMove(player.x - this.offsetX, player.y - nY)) {
		this.shift(this.offsetX, nY)
	}
}

World.prototype.checkMove = function(x11, y11) {
try {
	var collision = true;
	x11 += 25;
	var x0 = x11 - 20 - (48 >> 1);
	var x1 = x0 + 38;
	var y0 = y11 + 20 - (64 >> 1);
	var y1 = y0 + 32;
    for (var y = y0; y < y1; y+=2) {
            for (var x = x0; x < x1; x+=2) {
                    if (this.collideable(this.getTile(Math.round(x / this.TILE_WIDTH), Math.round(y / this.TILE_HEIGHT)).type)) collision = false;
            }
    }
} catch(e) {

}
	return collision;
}


World.prototype.collideable = function(tId) {
	if(tId == 0) {
		return false;
	} else {
		return true;
	}
}



World.prototype.getTile = function(x, y) {
	//Narrow down to the chunk
	var chunk = null;
	var loc = null;
	for(var i = 0; i < this.chunks.length; i++) {
		var chunkCurr = this.chunks[i];
		var chunkXR = chunkCurr.x * 8;
		var chunkYR = chunkCurr.y * 8 - 1;
		// Check if x is within bounds
		if(x >= chunkXR && x <= (chunkXR + (this.chunkHeight) - 1)) {
			//Check if y is within bounds
			if(y >= chunkYR && y <= (chunkYR + (this.chunkHeight))) {
				chunk = chunkCurr;
				loc = chunk.worldToLocal(x, y);
			}
		}
	}

	return chunk.getTile(Math.round(loc[0]), Math.round(loc[1]));
}

World.prototype.onScreen = function(x, y) {
	return true;
}



module.exports = exports = World;
