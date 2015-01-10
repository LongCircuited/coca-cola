var thomas = require('thomas');

function CocaCola(display)
{
  this.display = display;
  this.game = new thomas.Game();
  this.loop = new thomas.Loop(this.game.callUpdate.bind(this.game), this.game.callRender.bind(this.game));
}

CocaCola.prototype.start = function ()
{
  this.loop.start();
}

module.exports = exports = CocaCola;
