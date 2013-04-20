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
