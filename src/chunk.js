function Chunk(x, y, w, h, noiseGen) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.map = [];
	this.tiles = [w * h];
	this.relX = this.x + this.width;
	this.relY = this.y + this.height;

	this.noiseGen = noiseGen;

}

Chunk.prototype.getWorldCoord = function(x, y) {
	return [x + (this.x * this.width), y + (this.y*this.height)]
}

Chunk.prototype.genLandscape = function() {
	for(var x = 0; x < this.width; x++) {
		this.map[x] = [];
		for(var y = 0; y < this.height; y++) {
			var cc = this.getWorldCoord(x, y);
			var rand = Math.random();
			if(this.noiseGen.noise(cc[0]/32, cc[1]/32) > 0.1) {
				this.map[x][y] = 1;
			} else if(this.noiseGen.noise(cc[0]/32, cc[1]/32) > 0.001) {
				this.map[x][y] = 2;
			} else {
				this.map[x][y] = 0;
			}
			
		}
	}
}



module.exports = Chunk;