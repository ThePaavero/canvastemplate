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
