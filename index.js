var Game = require('./src/game');
var astar = require("./src/astar");



var canvas = document.getElementById('display');

var game = new Game(canvas);
game.start();


