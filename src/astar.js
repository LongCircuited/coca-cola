function AStar() {

}

function Node(x, y) {
	this.x = x;
	this.y = y;
	this.h = 0;	//movement cost from the start point A to the current square
	this.g = 0; //estimated movement cost from the current square to the destination point 
	this.f = this.h + this.g;
	this.state = 0;
	this.parent = null;
}

AStar.prototype.manhattanDistance = function(x0, x1, y0, y1) {
	return Math.abs(x1-x0) + Math.abs(y1-y0);
}

AStar.prototype.getSmallestNode = function(openarr) {
	var comp = openarr[0];
	for(var i = 0; i < openarr.length; i++) {
		if(openarr[i].f < comp) comp = openarr[i]
	}
	return comp;
}

AStar.prototype.getNeighbours = function(arr, current) {
	var right = new Node(current.x + 1, current.y);
	var left = new Node(Math.abs(current.x - 1), current.y);
	var top = new Node(current.x, current.y + 1);
	var bottom = new Node(current.x, Math.abs(current.y - 1));
	return [right, left, top, bottom];
}

AStar.prototype.calculateRoute = function(start, dest, arr){
	start.f = this.manhattanDistance(start.x, dest.x, start.y, dest.y);

	var closed = [];

	var open = [start];
	var traversed = [];


	var currentNode = this.getSmallestNode(open);
	for(var p = 0; p < 100; p++) {
		currentNode = this.getSmallestNode(open);
		if(currentNode.x == dest.x && currentNode.y == dest.y) {
			//We're done, reconstruct path
			return true;
		}
		open = open.splice(open.indexOf(currentNode), 1);
		closed.push(currentNode);

		var neighbours = this.getNeighbours(arr, currentNode);
		console.log(neighbours)
		for(var i = 0; i < neighbours.length; i++) {
			if(closed.indexOf(neighbours[i]) !== -1) {
				continue;
			}
			var temp_g = this.manhattanDistance(neighbours[i].x, dest.x, neighbours[i].y, dest.y);
			if(open.indexOf(neighbours[i]) == -1 || temp_g < neighbours[i].g) {
				neighbours[i].parent = currentNode;
				neighbours[i].g = temp_g;
				neighbours[i].f = neighbours[i].g + this.manhattanDistance(neighbours[i].x, dest.x, neighbours[i].y, dest.y);
				if(open.indexOf(neighbours[i]) == -1) {
					open.push(neighbours[i]);
				}
			}
		}
	}
		
		

}

module.exports = exports = AStar;