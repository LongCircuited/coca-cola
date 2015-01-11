function AStar() {

}

function Node(x, y) {
	this.x = x;
	this.y = y;

	this.neighbours = [];
	this.h = 0;	//movement cost from the start point A to the current square
	this.g = 0; //estimated movement cost from the current square to the destination point 
	this.f = this.h + this.g;
	this.state = 0;
	this.parent = null;
}

Node.prototype.genNeighbours = function() {
	var right = new Node(this.x + 1, this.y);
	var left = new Node(this.x - 1, this.y);
	var top = new Node(this.x, this.y + 1);
	var bottom = new Node(this.x, this.y - 1);
	this.neighbours = [right, left, top, bottom];
}

AStar.prototype.manhattanDistance = function(x0, x1, y0, y1) {
	return Math.abs(x1-x0) + Math.abs(y1-y0);
}

AStar.prototype.getSmallestNode = function(openarr) {
	var comp = 0;
	for(var i = 0; i < openarr.length; i++) {
		if(openarr[i].f < openarr[comp].f) comp = i
	}
	return comp;
}

AStar.prototype.calculateRoute = function(start, dest, arr){
	var open = new Array();
	var closed = new Array();

	start.g = 0;
	start.h = this.manhattanDistance(start.x, dest.x, start.y, dest.y);
	start.f = start.h;
	start.genNeighbours();
	open.push(start);
	while(open.length > 0) {
		var currentNode = null;
	 	currentNode = open[this.getSmallestNode(open)];
	 	if(this.equals(currentNode,dest)) return currentNode;
	 	currentNode.genNeighbours();
	 	var iOfCurr = open.indexOf(currentNode);
	 	open.splice(iOfCurr, 1);
	 	closed.push(currentNode);
	 	for(var i = 0; i < currentNode.neighbours.length; i++) {
	 		var neighbour = currentNode.neighbours[i];
	 		if(neighbour == null) continue;
	 		var newG = currentNode.g + 1;
	 		if(newG < neighbour.g) {
	 			var iOfNeigh = open.indexOf(neighbour);
	 			var iiOfNeigh = closed.indexOf(neighbour);
	 			open.splice(iOfNeigh, 1);
	 			closed.splice(iiOfNeigh,1);
	 		}
	 		if(open.indexOf(neighbour) == -1 && closed.indexOf(neighbour) == -1) {
	 			neighbour.g = newG;
	 			neighbour.h = this.manhattanDistance(neighbour.x, dest.x, neighbour.y, dest.y);
	 			neighbour.f = neighbour.g + neighbour.h;
	 			neighbour.parent = currentNode;
	 			open.push(neighbour);
	 		}
	 	}

	}

}

AStar.prototype.equals = function(node1, node2) {
	if(node1.x == node2.x && node1.y == node2.y) {
		return true;
	}
	return false;
}

AStar.prototype.sortNodes = function(arr) {
	var swap = true;
	while(swap) {
		swap = false;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].f < arr[i+1].f) {
				var temp = arr[i + 1];
				arr[i + 1] = arr[i];
				arr[i] = temp;
				swap = true;
			} 
		}
	}	
	return arr;
}



module.exports = exports = AStar;