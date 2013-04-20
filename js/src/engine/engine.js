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
