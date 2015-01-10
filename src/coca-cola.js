var IMAGE_PATHS = [ 'images/dirt.png', 'images/grass.png' ];

var thomas = require('thomas');
var resourceUtil = require('./util/resource');

function CocaCola(display)
{
  this.display = display;
  this.loop = new thomas.Loop(this.callUpdate.bind(this), this.callRender.bind(this));
}

CocaCola.prototype = Object.create(thomas.Game.prototype);

CocaCola.prototype.start = function ()
{
  resourceUtil.loadImages(
    IMAGE_PATHS,
    function (images)
    {
      this.images = images;
      this.loop.start();
    }.bind(this)
  );
}

CocaCola.prototype.begin = function ()
{
  console.log('Game Started');
}

CocaCola.prototype.update = function ()
{
  console.log('Game Update');
}

CocaCola.prototype.render = function ()
{
  console.log('Game Render');
}

module.exports = exports = CocaCola;
