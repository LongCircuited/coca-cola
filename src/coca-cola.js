var thomas = require('thomas');

function CocaCola(display)
{
  this.display = display;
  this.loop = new thomas.Loop(this.callUpdate.bind(this.game), this.callRender.bind(this.game));
}

CocaCola.prototype = Object.create(thomas.Game);

CocaCola.prototype.start = function ()
{
  this.loop.start();
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
