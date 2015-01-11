var Node = require("./node");

function AStar() {
	this.lookupStruct = [];
}

AStar.prototype.manhattanDistance = function(x0, x1, y0, y1) {
	return Math.abs(x1-x0) + Math.abs(y1-y0);
}

AStar.prototype.getSmallestNode = function(openarr) {
	var comp = 0;
	for(var i = 1; i < openarr.length; i++) {
		if(openarr[i].f < openarr[comp].f) comp = i
	}
	return comp;
}

AStar.prototype.createLookupStructure = function(arr) {
	for(var x = 0; x < arr.length; x++) {
		for(var y = 0; y < arr[x].length; y++) {
			this.lookupStruct[x * arr.length + y] = new Node(x, y);
		}
	}
	this.lookupStruct.width = arr.length;
	this.lookupStruct.arr = arr;
}

AStar.prototype.calculateRoute = function(start, dest){
	var open = new Array();
	var closed = new Array();

	start = this.lookupStruct[start.x * this.lookupStruct.width + start.y];
	dest = this.lookupStruct[dest.x * this.lookupStruct.width + dest.y];

	start.g = 0;
	start.h = this.manhattanDistance(start.x, dest.x, start.y, dest.y);
	start.f = start.h;

	start.genNeighbours(this.lookupStruct);
	
	open.push(start);
	
	while(open.length > 0) {

		var currentNode = null;

	 	currentNode = open[this.getSmallestNode(open)];

	 	if(this.equals(currentNode,dest)) return this.resolvePath(currentNode);

	 	currentNode.genNeighbours(this.lookupStruct);

	 	var iOfCurr = open.indexOf(currentNode);

	 	open.splice(iOfCurr, 1);

	 	closed.push(currentNode);

	 	for(var i = 0; i < currentNode.neighbours.length; i++) {

	 		var neighbour = currentNode.neighbours[i];

	 		if(neighbour == null) continue;
	 		if(this.lookupStruct.arr[neighbour.x][neighbour.y] == 1) continue;

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
	
	return null;

}

AStar.prototype.resolvePath = function(node) {
	var parent = node.parent;
	var route = [parent];
	while(parent != null) {
		route.push({x: parent.x, y: parent.y});
		parent = parent.parent;
	}

	return route;
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