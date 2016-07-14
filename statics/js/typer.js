var Typer = (function(){
	var Constructor = function(container){
		this.container = container;
		this.queue = [];

		var $caret = this.caret = $('<span/>').addClass('caret').css({
			"display": "inline-block",
			"height": "1.5em",// || this.determineLineHeight(),
			"width": "0.1em",
			"overflow": "hidden",
			"background": "#fff",
			//"position": "absolute"
			"vertical-align": "text-bottom"
		});

		setTimeout(function(){
			var curBg = this.caret.css("backgroundColor");
			if(!this.typingPaused
			|| curBg === "rgba(0, 0, 0, 0)") {
				this.caret.css("backgroundColor", "#fff");
				setTimeout(arguments.callee.bind(this), 600);
			} else {
				this.caret.css("backgroundColor", "transparent");
				setTimeout(arguments.callee.bind(this), 450);
			}
		}.bind(this), 10);
	};

	Constructor.prototype = {
		container: null,

		queue: null,
		typing: false,

		typingPaused: true,

		caret: null,

		determineLineHeight(container) {
			container=container||this.container;
			var height, $tmp;
			try {
				$tmp = $('<ignore/>').appendTo(container);
				height = $tmp.html('&nbsp;').outerHeight() + "px";
				$tmp.remove();
			} catch(e) {
				console.warn("Error calculating line height");
			} finally {
				return height || "1em";
			}
		},

		startTypingQueue() {
			if(this.typing) return;
			if(this.queue.length < 1) return;

			this.typing = true;

			var nextMsg = this.queue.splice(0,1)[0];

			if(nextMsg.callback && typeof nextMsg.callback === "function") {
				var res = nextMsg.callback(this);
				return this.typing = false;
			}

			setTimeout(function(){
				this.typingPaused = false;
				var msgText = nextMsg.message;

				var chars = msgText.split('').reverse().map(
					(txt) => txt.replace(/\s+/ig,'&nbsp;').replace(/\n\r?/ig,'<br>')
				);

				var thisInterval;
				thisInterval = setInterval(function(){
					if(typeof nextMsg.container === "function") {
						nextMsg.container = nextMsg.container.call(this,this.prevMsg,nextMsg);
					}

					if(chars.length < 1){
						clearInterval(thisInterval);
						this.typingPaused = true;
						this.typing = false;
						this.prevMsg = nextMsg;
						this.startTypingQueue();
						return;
					}

					this.caret.remove();
					this.caret.css('height', this.determineLineHeight(nextMsg.container));
					$(nextMsg.container).html( $(nextMsg.container).html().replace('&nbsp;',' ') + chars.pop() );
					if(nextMsg.withCaret) $(nextMsg.container).append( this.caret );
					else this.caret.remove();
				}.bind(this), nextMsg.perCharWait);
			}.bind(this), nextMsg.wait);
		},

		focus( nextContainer ){
			this.container = nextContainer;
			return this;
		},

		callback( func ){
			return this.queue.push({
				callback: func
			}), this;
		},

		type(msg, wait, perCharWait, withCaret) {
			if(typeof msg === "object") {
				return this.queue.push(msg), this;
			}

			return this.queue.push({
				message: msg,
				wait: wait || 500,
				perCharWait: perCharWait || 100,
				withCaret: withCaret || false,
				container: this.container
			}), this;
		}
	};

	return Constructor;
})();
