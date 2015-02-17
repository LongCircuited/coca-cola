var tile = require("./tile");
var noise = require("./util/noise");

function Chunk(x, y, w, h, noiseGen) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.DIMENSIONS = this.width * this.height;
	this.map = [];
	this.tiles = [w * h];
	this.relX = this.x + this.width;
	this.relY = this.y + this.height;
	this.TILE_WIDTH = 64;
	this.TILE_HEIGHT = 64;
	this.noiseGen = noiseGen;
	this.offsetX = 0;
	this.offsetY = 0;
}

Chunk.prototype.getWorldCoord = function(x, y) {
	return [x + (this.x * this.width), y + (this.y * this.height)]
}


Chunk.prototype.getTile = function(x, y) {
	return this.tiles[x * this.DIMENSIONS + y];
}

Chunk.prototype.render = function(display) {
	for(var i = 0; i < this.DIMENSIONS; i++) {
		var row = i % this.map.length;
		var col = ~~(i / this.map.length);
		var tile = this.getTile(row, col);		

		tile.render(display);
		
	}
	
	//display.fillText("CHUNK: " + this.x + ", " + this.y, this.x * 8 * this.TILE_WIDTH + 20 + this.offsetX, this.y * 8 *  this.TILE_HEIGHT + 20 + this.offsetY);

}

Chunk.prototype.offScreen = function() {
	// Grab screen coords
	var chunkX = this.x * this.width * this.TILE_WIDTH + this.offsetX;
	var chunkY = this.y * this.width * this.TILE_HEIGHT + this.offsetY;
	
	if(chunkX > 2000) {
		return "lateral-r";
	} else if(chunkX < -1000) {
		return "lateral-l";
	}
	if(chunkY > 2000) {
		return "vertical-d";
	} else if(chunkY < -1000) {
		return "vertical-u";
	}
	return false;
}

Chunk.prototype.shift = function(x1, y1) {
	this.offsetX = x1;
	this.offsetY = y1;
	 for(var x = 0; x < this.map.length; x++) {
		for(var y = 0; y < this.map[x].length; y++) {
			this.tiles[x * (this.DIMENSIONS) + y].shiftX = x1;
			this.tiles[x * (this.DIMENSIONS) + y].shiftY = y1;
		}
	}
}

Chunk.prototype.init = function(images) {
	this.genLandscape();
	// Fill array with tiles from the map array
	for(var x = 0; x < this.map.length; x++) {
		for(var y = 0; y < this.map[x].length; y++) {
			var chunkX = this.x * this.width * this.TILE_WIDTH + x * this.TILE_WIDTH;
			var chunkY = this.y * this.width * this.TILE_HEIGHT + y * this.TILE_HEIGHT;

			if(this.map[x][y] == 1) {
				this.tiles[x * (this.DIMENSIONS) + y] = new tile(chunkX, chunkY,this.TILE_WIDTH, this.TILE_HEIGHT, images['images/water']);
				this.tiles[x * (this.DIMENSIONS) + y].type = 1;	
			} else if(this.map[x][y] == 2) {
				this.tiles[x * (this.DIMENSIONS) + y] = new tile(chunkX, chunkY, this.TILE_WIDTH, this.TILE_HEIGHT, images['images/dirt']);	
				this.tiles[x * (this.DIMENSIONS) + y].type = 2;
			} else {
				this.tiles[x * (this.DIMENSIONS) + y] = new tile(chunkX, chunkY, this.TILE_WIDTH, this.TILE_HEIGHT, images['images/grass']);	
				this.tiles[x * (this.DIMENSIONS) + y].type = 0;
			}
		}
	}
}


Chunk.prototype.genLandscape = function() {
	for(var x = 0; x < this.width; x++) {
		this.map[x] = [];
		for(var y = 0; y < this.height; y++) {
			var cc = this.getWorldCoord(x, y);
			if(this.noiseGen.noise(cc[0]/64, cc[1]/64) > 0.5) {
				this.map[x][y] = 1;
			} else if(this.noiseGen.noise(cc[0]/64, cc[1]/64) > 0.001) {
				this.map[x][y] = 2;
			} else {
				this.map[x][y] = 0;
			}
			
		}
	}
}



module.exports = Chunk;