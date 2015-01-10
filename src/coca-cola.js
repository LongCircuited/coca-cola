var thomas = require('thomas');
var world = require("./world");
var tile = require('./tile');
var player = require('./player');

var world = new world();
var ployer = new player(0,0);

var keys = {};

function CocaCola(display)
{
  this.display = display;
  this.display.width = 1000;
  this.display.height = 1000;
  this.context = display.getContext("2d");
  this.loop = new thomas.Loop(this.callUpdate.bind(this), this.callRender.bind(this));


	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp);
}

function keyDown(e) {
	keys[e.keyCode] = e.keyCode;
}

function keyUp(e) {
	delete keys[e.keyCode];
}


CocaCola.prototype = Object.create(thomas.Game.prototype);


CocaCola.prototype.start = function ()
{
  world.init();
  this.loop.start();
}

CocaCola.prototype.begin = function ()
{

  
}

CocaCola.prototype.update = function ()
{
  
}

CocaCola.prototype.render = function ()
{
	this.context.clearRect(0,0,this.display.width, this.display.height);
	world.render(this.context);
	ployer.render(this.context);
	ployer.update(1,1);
 
}


module.exports = exports = CocaCola;
