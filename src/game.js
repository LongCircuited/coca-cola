var IMAGE_PATHS = [ 'images/dirt.png', 'images/grass.png' ,'images/ein.png','images/longgrass.png','images/ba.png','images/ein2.png','images/ein3.png'];

var thomas = require('thomas');

var world = require("./world");

var resourceUtil = require('./util/resource');


var tile = require('./tile');
var player = require('./player');
var enemy = require('./enemy')

var world = new world();
var ployer;
var onemy;

var keys = {};

function Game(display)
{
  this.display = display;
  this.display.width = 1000;
  this.display.height = 1000;
  this.context = display.getContext("2d");
  this.loop = new thomas.Loop(this.callUpdate.bind(this), this.callRender.bind(this), { updatesPerSecond: 60 });


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

  this.context.imageSmoothingEnabled = false;

  resourceUtil.loadImages(
    IMAGE_PATHS,
    function (images)
    {
      this.images = images;
	    world.init(images);
      ployer = new player(436,436, this.images['images/ba']);
      onemy = new enemy(320,0,this.images['images/ein']);
      this.loop.start();
    }.bind(this)
  );

}

Game.prototype.begin = function ()
{

}


Game.prototype.update = function (d)
{

  //ployer.move(keys, world, d);

  world.move(keys, ployer, d);
    onemy.update(world.offsetX, world.offsetY);
}

Game.prototype.render = function (d)
{

  this.context.clearRect(0,0,this.display.width, this.display.height);
  world.render(this.context);
  ployer.render(this.context);
  onemy.render(this.context);

}


module.exports = exports = Game;
