// requires namespace

$(function()
{
	var canvas = document.getElementById('canvas');
	window._root = '';

	var engine = new Game.Engine.Main();

	engine.setCanvas(canvas);
	engine.init();

	var game = new Game.Main();
	game.init(engine, canvas);

	engine.setFrameCallback(game.gameFrame);
});
