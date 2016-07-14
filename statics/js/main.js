
	var focusElem = $('#top .container > div').get(0);

	var AutoType = new Typer(focusElem);

	AutoType
		.focus( focusElem = $('<p/>').appendTo(focusElem) )
		.type("It's more than ", 10, 75, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo(focusElem)
		})(focusElem) )
		.type("designing", 10, 75, true)

		.focus( (function(focusElem){
			return () => $('<span/>').appendTo(focusElem)
		})(focusElem) )
		.type(" or ", 10, 75, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo(focusElem)
		})(focusElem) )
		.type("developing", 10, 55, true)

		.focus( (function(focusElem){
			return () => $('<span/>').appendTo(focusElem)
		})(focusElem) )
		.type("...", 250, 75, true)

		.focus( focusElem = $('<p/>').insertAfter(focusElem) )
		.type(" It's about ", 10, 75, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo(focusElem)
		})(focusElem) )
		.type("discovering", 10, 75, true)

		.focus( (function(focusElem){
			return () => $('<span/>').appendTo(focusElem)
		})(focusElem) )
		.type(" what we as humans were made to do:", 300, 55, true)
		.type(" ", 500, 55, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo(focusElem)
		})(focusElem) )
		.type("create", 100, 155, true)

		.focus( focusElem = $('<p/>').insertAfter(focusElem) )
		.type("Following in the footsteps of our creator...", 500, 55, true)

		.focus( focusElem = $('<p/>').insertAfter(focusElem) )
		.type("And ", 500, 55, true)
		.type("not just create", 300, 55, true)
		.type(". ", 300, 200, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo(focusElem)
		})(focusElem) )
		.type("Create ", 10, 55, true)

		.focus( (function(focusElem){
			return () => $('<b/>').appendTo($('<i>').appendTo(focusElem))
		})(focusElem) )
		.type("beautifully.", 300, 100, true)
		.callback(function(){
			//alert("done!")
		});

	AutoType.startTypingQueue();
