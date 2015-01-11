var Game = require('./src/game');
var astar = require("./src/astar");



function Node(x, y) {
	this.x = x;
	this.y = y;
	this.h = 0;	//movement cost from the start point A to the current square
	this.g = 0; //estimated movement cost from the current square to the destination point 
	this.f = this.h + this.g;
	this.state = 0;
	this.parent = null;
}
var start = new Node(0,0);
var end = new Node(10,10);
var map = [];
for(var x = 0; x < 100; x++) {
		map[x] = [];
		for(var y = 0; y < 100; y++) {
			var rand = Math.random();
			if(rand > 0.9) {
				map[x][y] = 0;
			} else {
				map[x][y] = 0;
			}
		}
	}


var aStar = new astar();


aStar.calculateRoute(start, end, map)

var canvas = document.getElementById('display');

var game = new Game(canvas);
game.start();


