// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/* https://github.com/d3/d3-timer Copyright 2015 Mike Bostock */
"undefined"==typeof requestAnimationFrame&&(requestAnimationFrame="undefined"!=typeof window&&(window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame)||function(e){return setTimeout(e,17)}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.timer={})}(this,function(e){"use strict";function t(){l=s=0,c=1/0,n(a())}function n(e){if(!l){var n=e-Date.now();n>24?c>e&&(s&&clearTimeout(s),s=setTimeout(t,n),c=e):(s&&(s=clearTimeout(s),c=1/0),l=requestAnimationFrame(t))}}function i(e,t){this.callback=e,this.time=t,this.flush=!1,this.next=null}function o(e,t,o){o=null==o?Date.now():+o,null!=t&&(o+=+t);var u=new i(e,o);r?r.next=u:m=u,r=u,n(o)}function u(e,t,n){n=null==n?Date.now():+n,null!=t&&(n+=+t),f.callback=e,f.time=n}function a(e){e=null==e?Date.now():+e;var t=f;for(f=m;f;)e>=f.time&&(f.flush=f.callback(e-f.time,e)),f=f.next;f=t,e=1/0;for(var n,i=m;i;)i.flush?i=n?n.next=i.next:m=i.next:(i.time<e&&(e=i.time),i=(n=i).next);return r=n,e}var m,r,f,l,s,c=1/0;e.timer=o,e.timerReplace=u,e.timerFlush=a});

/* Source: https://bl.ocks.org/mbostock/157333662ef11c151080 */
var canvas = document.querySelector("#js-particles"),
    context = canvas.getContext("2d"), width, height;

var calculateDimensions = () => {
    canvas.height = canvas.width =
    width = height = Math.max(
      window.innerWidth || canvas.width,
      window.innerHeight || canvas.height
    );
};

calculateDimensions();

var resizeCanvas = debounce(calculateDimensions, 250);
window.addEventListener('resize', resizeCanvas);

var radius = 2.5,
    minDistance = 100,
    maxDistance = 150,
    minDistance2 = minDistance * minDistance,
    maxDistance2 = maxDistance * maxDistance;

var tau = 2 * Math.PI,
    n = Math.ceil(width * 0.15),
    particles = new Array(n);

for (var i = 0; i < n; ++i) {
  var xv;
  particles[i] = {
    x0: width * Math.random(),
    y0: height * Math.random(),
    xv: xv = .02 * (Math.random() - .5),
    yv: xv - (.02 * (Math.random() - .5))
  };
}

timer.timer(function(elapsed) {
  context.clearRect(0, 0, width, height);

  for (var i = 0; i < n; ++i) {
    for (var j = i + 1; j < n; ++j) {
      var pi = particles[i],
          pj = particles[j],
          dx = pi.x - pj.x,
          dy = pi.y - pj.y,
          d2 = dx * dx + dy * dy;
      if (d2 < maxDistance2) {
        context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
        context.beginPath();
        context.moveTo(pi.x, pi.y);
        context.lineTo(pj.x, pj.y);
        context.fillStyle="rgba(41,182,246,0.5)";
        context.stroke();
      }
    }
  }
  context.globalAlpha = 1;

  for (var i = 0; i < n; ++i) {
    var p = particles[i];
    p.x = p.x0 + elapsed * p.xv;
    p.y = p.y0 + elapsed * p.yv;
    if (p.y > height + maxDistance) p.x = width * Math.random(), p.y0 -= height + 2 * maxDistance;
    else if (p.y < -maxDistance) p.x = width * Math.random(), p.y0 += height + 2 * maxDistance;
    if (p.x > width + maxDistance) p.y = height * Math.random(), p.x0 -= width + 2 * maxDistance;
    else if (p.x < -maxDistance) p.y = height * Math.random(), p.x0 += width + 2 * maxDistance;
    context.beginPath();
    context.fillStyle="rgba(41,182,246,0.5)";
    context.strokeStyle="rgba(41,182,246,0.5)";
    context.arc(p.x, p.y, radius, 0, tau);
    context.fill();
  }
});
