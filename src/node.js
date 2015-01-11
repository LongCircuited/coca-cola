function Node(x, y) {
	this.x = x;
	this.y = y;
	this.neighbours = [];
	this.h = 0;	//movement cost from the start point A to the current square
	this.g = 0; //estimated movement cost from the current square to the destination point 
	this.f = this.h + this.g; // sum of the two
	this.parent = null;
}

Node.prototype.genNeighbours = function(lookup) {
	var right = lookup[(this.x + 1) * lookup.width + this.y]
	var left = lookup[(this.x - 1) * lookup.width + this.y];
	var top = lookup[this.x * lookup.width + (this.y + 1)];
	var bottom = lookup[this.x * lookup.width +  (this.y - 1)];
	this.neighbours = [right, left, top, bottom];
}


module.exports = exports = Node;