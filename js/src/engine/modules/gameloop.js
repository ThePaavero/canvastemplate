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
