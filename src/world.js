var tile = require("./tile");

function World() {
	this.map = [
	];


	for(var x = 0; x < 100; x++) {
		this.map[x] = [];
		for(var y = 0; y < 100; y++) {
			var rand = Math.random();
			if(rand > 0.9) {
				this.map[x][y] = 1;
			} else {
				this.map[x][y] = 0;
			}
		}
	}

 	this.WIDTH = this.map.length;
 	this.HEIGHT = this.map.length;
 	this.DIMENSIONS = this.WIDTH * this.HEIGHT;
 	this.TILE_WIDTH = 64;
 	this.TILE_HEIGHT = 64;
 	this.offsetX = 0;
 	this.offsetY = 0;
	this.tiles = [this.DIMENSIONS];
}

World.prototype.init = function(images) {
	// Fill array with tiles from the map array
	for(var x = 0; x < this.WIDTH; x++) {
		for(var y = 0; y < this.WIDTH; y++) {
			if(this.map[x][y] == 1) {
				this.tiles[x * (this.DIMENSIONS) + y] = new tile(x * this.TILE_WIDTH, y * this.TILE_HEIGHT, this.TILE_WIDTH, this.TILE_HEIGHT, images['images/dirt']);
				this.tiles[x * (this.DIMENSIONS) + y].type = 1;	
			} else {
				this.tiles[x * (this.DIMENSIONS) + y] = new tile(x * this.TILE_WIDTH, y * this.TILE_HEIGHT, this.TILE_WIDTH, this.TILE_HEIGHT, images['images/grass']);	
				this.tiles[x * (this.DIMENSIONS) + y].type = 0;
			}
		}
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
	var collision = true;
	x11 += 25;
	var x0 = x11 - 20 - (48 >> 1);
	var x1 = x0 + 38;
	var y0 = y11 + 32 - (64 >> 1);
	var y1 = y0 + 32;
    for (var y = y0; y < y1; y++) {
            for (var x = x0; x < x1; x++) {
                    if (this.getTile(Math.round(x / 64), Math.round(y / 64)).type == 1) collision = false;
            }
    }
	return collision;
}

World.prototype.shift = function(x1, y1) {
	// Shove the map over by a few
	this.offsetX = x1;
	this.offsetY = y1;
	// Throw the values into the tiles
	for(var x = 0; x < this.map.length; x++) {
		for(var y = 0; y < this.map[x].length; y++) {
			this.tiles[x * (this.DIMENSIONS) + y].shiftX = x1;
			this.tiles[x * (this.DIMENSIONS) + y].shiftY = y1;
		}
	}
}

World.prototype.getTile = function(x, y) {
	return this.tiles[x * this.DIMENSIONS + y];
}

World.prototype.render = function(display) {
	// Slam the tiles onto the screen
	for(var x = 0; x < this.map.length; x++) {
		for(var y = 0; y < this.map[x].length; y++) {
			var tile = this.tiles[x * (this.DIMENSIONS) + y];
			tile.render(display);
		}
	}
}


module.exports = exports = World;
