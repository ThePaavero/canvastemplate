window.Game = {};

Game.Engine         = {};
Game.Engine.Modules = {};



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



// requires start

Game.Engine.Main = function() {

	var modules;
	var canvas;
	var cc;
	var running;
	var custom_frame_callback = function() { console.log('No custom frame callback set!'); };

	var fps_filter = 50;
	var last_update = (new Date())*1 - 1;
	var fps = 0;
	var now;

	var image_root = _root + 'images/';

	this.init = function()
	{
		modules = Game.Engine.Modules;
		running = true;
		startLoop();

		doBasicKeyboardControls();
	};

	this.setCanvas = function(_c)
	{
		canvas = _c;

		canvas.width  = $(canvas).width();
		canvas.height = $(canvas).height();

		cc = canvas.getContext('2d');
	};

	this.setFrameCallback = function(f)
	{
		custom_frame_callback = f;
	};

	this.addElement = function(src, x, y)
	{
		var e = new modules.GameElement();
		e.setSrc(image_root + src);
		e.setCoords(x, y);
		e.addToCC(cc);
	};

	// -----------------------------------------------------------------------

	var pause = function()
	{
		running = false;
		console.log('Game paused');
	};

	var resume = function()
	{
		running = true;
		startLoop();
		console.log('Game resumed');
	};

	var startLoop = function()
	{
		var loop = new modules.GameLoop();
		loop.init(gameFrame);
		console.log('Game started');
	};

	var gameFrame = function()
	{
		updateFPSindicator();

		clearCanvas();
		custom_frame_callback();

		if(running === false)
		{
			return false;
		}
	};

	var updateFPSindicator = function()
	{
		var this_frame_FPS = 1000 / ((now=new Date()) - last_update);
		fps += (this_frame_FPS - fps) / fps_filter;
		last_update = now;
		var show_fps = Math.round(fps);
		$('#fps_indicator').html(show_fps + ' FPS');
	};

	var clearCanvas = function()
	{
		cc.save();
		cc.setTransform(1, 0, 0, 1, 0, 0);
		cc.clearRect(0, 0, canvas.width, canvas.height);
		cc.restore();
	};

	var doBasicKeyboardControls = function()
	{
		$(window).keydown(function(e)
		{
			var cc = e.keyCode;
			// console.log(cc);
			switch(cc)
			{
				case 19: // Pause/Break
				case 80: // P
					togglePause();
					break;
			}
		});
	};

	var togglePause = function()
	{
		if(running === true)
		{
			pause();
		}
		else
		{
			resume();
		}
	};

};



// requires engine/engine

Game.Engine.Modules.GameElement = function() {

	var image_src;
	var coords = {top : 0, left : 0};

	this.init = function()
	{
		// TODO
	};

	this.setSrc = function(src)
	{
		image_src = src;
	};

	this.setCoords = function(x, y)
	{
		coords = {
			top  : y,
			left : x
		};
	};

	this.addToCC = function(cc)
	{
		base_image = new Image();
		base_image.src = image_src;
		cc.drawImage(base_image, coords.top, coords.left);
		base_image.onload = function()
		{
			cc.drawImage(base_image, coords.top, coords.left);
		};
	};

};



// requires engine/engine

Game.Engine.Modules.GameLoop = function() {

	var running;
	var loopCallback;

	this.init = function(callback)
	{
		return animLoop(callback);
	};

	var animLoop = function(render, element)
	{
		var running, lastFrame = +new Date();

		function loop(now)
		{
			// stop the loop if render returned false
			if(running !== false)
			{
				requestAnimationFrame(loop, element);
				var deltaT = now - lastFrame;

				// do not render frame when deltaT is too high
				if(deltaT < 160)
				{
					running = render(deltaT);
				}

				lastFrame = now;
			}
		}

		loop(lastFrame);
	};

};



// requires start

Game.Main = function() {

	var engine;
	var elements = [];
	var cc;
	var goto_x = 0;
	var goto_y = 0;

	this.init = function(_engine, canvas)
	{
		canvas = canvas;
		cc     = canvas.getContext('2d');
		engine = _engine;

		createBaseElements();

		console.log('Custom game is now running.');

		$(canvas).click(function(e)
		{
			canvasClick(e.offsetY, e.offsetX);
		});
	};

	this.gameFrame = function()
	{
		for(var i in elements)
		{
			moveElement(elements[i], {
				x : goto_x,
				y : goto_y
			});
		}

		updateElements();
	};

	// -----------------------------------------------------------------------

	var createBaseElements = function()
	{
		elements.push({
			image : 'test.png',
			x     : 20,
			y     : 40
		});
	};

	var updateElements = function()
	{
		for(var i in elements)
		{
			var e = elements[i];
			engine.addElement(e.image, e.x, e.y);
		}
	};

	var moveElement = function(e, movements)
	{
		e.x = movements.x;
		e.y = movements.y;
	};

	var canvasClick = function(x, y)
	{
		console.log(x + '.' + y);
		goto_x = x;
		goto_y = y;
	};

};



