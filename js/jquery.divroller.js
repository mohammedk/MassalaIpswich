/**
 * @author ilkinulas@gmail.com
 * jquery plugin that rotates div elements inside a given div element
 */
var hiddenDivs = [];

jQuery.fn.divroller = function(options) {
	settings = jQuery.extend( {
		visible : 3,
		pause : 3000
	}, options);

	start(settings, this);
	
	function start(settings, container) {
		var divs = container.children();
		//hide unvisible divs
		while (settings.visible < divs.length) {
			var removedDiv = $(divs[divs.length - 1]).remove();
			hiddenDivs.push(removedDiv);
			divs = container.children();
		}
		
		setTimeout( function() {
			roll(settings, container)
		}, settings.pause);
		
	};

	function roll(settings, container) {
		//Dom manipulation.
		container.prepend(hiddenDivs.pop());
		hiddenDivs.unshift($(container.children()[settings.visible]).remove());
		
		//Efect
		$(container.children()[0]).hide();
		$(container.children()[0]).slideDown("slow");

		//Repeat
		setTimeout( function() {
			roll(settings, container)
		}, settings.pause);
	}
}
