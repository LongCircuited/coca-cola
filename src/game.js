var IMAGE_PATHS = [ 'images/dirt.png', 'images/grass.png' ];

var thomas = require('thomas');

var world = require("./world");

var resourceUtil = require('./util/resource');


var tile = require('./tile');
var player = require('./player');

var world = new world();
var ployer;

var keys = {};

function Game(display)
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


Game.prototype = Object.create(thomas.Game.prototype);

Game.prototype.start = function ()
{

  this.display.imageSmoothingEnabled = false;

  resourceUtil.loadImages(
    IMAGE_PATHS,
    function (images)
    {
      this.images = images;
	  world.init(images);
      ployer = new player(0,0, this.images['images/dirt']);
      this.loop.start();
    }.bind(this)
  );

}

Game.prototype.begin = function ()
{


}

Game.prototype.update = function ()
{

}

Game.prototype.render = function ()
{
	this.context.clearRect(0,0,this.display.width, this.display.height);
	world.render(this.context);
	ployer.render(this.context);

	ployer.update(1,1);

}


module.exports = exports = Game;
