var tile = require("./tile");

function World() {
	this.map = [[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]
	];

 	this.WIDTH = this.map.length;
 	this.HEIGHT = this.map.length;
 	this.DIMENSIONS = this.WIDTH * this.HEIGHT;
 	this.TILE_WIDTH = 64;
 	this.TILE_HEIGHT = 64;
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

World.prototype.render = function(display) {
	// Slam the tiles onto the screen
	for(var x = 0; x < this.map.length; x++) {
		for(var y = 0; y < this.map.length; y++) {
			var tile = this.tiles[x * (this.DIMENSIONS) + y];
			tile.render(display);
		}
	}
} 


module.exports = exports = World;