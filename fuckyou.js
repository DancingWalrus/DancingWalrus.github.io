/*
	--------------------------------
	Infinite Scroll
	--------------------------------
	+ https://github.com/paulirish/infinite-scroll
	+ version 2.0b2.120519
	+ Copyright 2011/12 Paul Irish & Luke Shumard
	+ Licensed under the MIT license
	
	+ Documentation: http://infinite-scroll.com/
	
*/
(function(h,d,e){d.infinitescroll=function(a,c,b){this.element=d(b);this._create(a,c)||(this.failed=!0)};d.infinitescroll.defaults={loading:{finished:e,finishedMsg:"",img:"http://static.tumblr.com/uiqhh9x/38Em68qk4/loading.gif",msg:null,msgText:"<em></em>",selector:null,speed:"fast",start:e},state:{isDuringAjax:!1,isInvalidPage:!1,isDestroyed:!1,isDone:!1,isPaused:!1,currPage:1},callback:e,debug:!1,behavior:e,binder:d(h),
nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:!1,pathParse:e,dataType:"html",appendCallback:!0,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:e,path:e};d.infinitescroll.prototype={_binding:function(a){var c=this,b=c.options;b.v="2.0b2.111027";if(b.behavior&&this["_binding_"+b.behavior]!==e)this["_binding_"+b.behavior].call(this);else{if("bind"!==a&&"unbind"!==a)return this._debug("Binding value  "+
a+" not valid"),!1;if("unbind"==a)this.options.binder.unbind("smartscroll.infscr."+c.options.infid);else this.options.binder[a]("smartscroll.infscr."+c.options.infid,function(){c.scroll()});this._debug("Binding",a)}},_create:function(a,c){var b=d.extend(!0,{},d.infinitescroll.defaults,a);if(!this._validate(a))return!1;this.options=b;var g=d(b.nextSelector).attr("href");if(!g)return this._debug("Navigation selector not found"),!1;b.path=this._determinepath(g);b.contentSelector=b.contentSelector||this.element;
b.loading.selector=b.loading.selector||b.contentSelector;b.loading.msg=d('<div id="infscr-loading"><img alt="Loading..." src="'+b.loading.img+'" /><div>'+b.loading.msgText+"</div></div>");(new Image).src=b.loading.img;b.pixelsFromNavToBottom=d(document).height()-d(b.navSelector).offset().top;b.loading.start=b.loading.start||function(){d(b.navSelector).hide();b.loading.msg.appendTo(b.loading.selector).show(b.loading.speed,function(){beginAjax(b)})};b.loading.finished=b.loading.finished||function(){b.loading.msg.fadeOut("normal")};
b.callback=function(a,g){b.behavior&&a["_callback_"+b.behavior]!==e&&a["_callback_"+b.behavior].call(d(b.contentSelector)[0],g);c&&c.call(d(b.contentSelector)[0],g,b)};this._setup();return!0},_debug:function(){if(this.options&&this.options.debug)return h.console&&console.log.call(console,arguments)},_determinepath:function(a){var c=this.options;if(c.behavior&&this["_determinepath_"+c.behavior]!==e)this["_determinepath_"+c.behavior].call(this,a);else{if(c.pathParse)return this._debug("pathParse manual"),
c.pathParse(a,this.options.state.currPage+1);if(a.match(/^(.*?)\b2\b(.*?$)/))a=a.match(/^(.*?)\b2\b(.*?$)/).slice(1);else if(a.match(/^(.*?)2(.*?$)/)){if(a.match(/^(.*?page=)2(\/.*|$)/))return a=a.match(/^(.*?page=)2(\/.*|$)/).slice(1);a=a.match(/^(.*?)2(.*?$)/).slice(1)}else{if(a.match(/^(.*?page=)1(\/.*|$)/))return a=a.match(/^(.*?page=)1(\/.*|$)/).slice(1);this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
c.state.isInvalidPage=!0}this._debug("determinePath",a);return a}},_error:function(a){var c=this.options;c.behavior&&this["_error_"+c.behavior]!==e?this["_error_"+c.behavior].call(this,a):("destroy"!==a&&"end"!==a&&(a="unknown"),this._debug("Error",a),"end"==a&&this._showdonemsg(),c.state.isDone=!0,c.state.currPage=1,c.state.isPaused=!1,this._binding("unbind"))},_loadcallback:function(a,c){var b=this.options,g=this.options.callback,f=b.state.isDone?"done":!b.appendCallback?"no-append":"append";if(b.behavior&&
this["_loadcallback_"+b.behavior]!==e)this["_loadcallback_"+b.behavior].call(this,a,c);else{switch(f){case "done":return this._showdonemsg(),!1;case "no-append":"html"==b.dataType&&(c=d("<div>"+c+"</div>").find(b.itemSelector));break;case "append":var i=a.children();if(0==i.length)return this._error("end");for(f=document.createDocumentFragment();a[0].firstChild;)f.appendChild(a[0].firstChild);this._debug("contentSelector",d(b.contentSelector)[0]);d(b.contentSelector)[0].appendChild(f);c=i.get()}b.loading.finished.call(d(b.contentSelector)[0],
b);b.animate&&(f=d(h).scrollTop()+d("#infscr-loading").height()+b.extraScrollPx+"px",d("html,body").animate({scrollTop:f},800,function(){b.state.isDuringAjax=!1}));b.animate||(b.state.isDuringAjax=!1);g(this,c)}},_nearbottom:function(){var a=this.options,c=0+d(document).height()-a.binder.scrollTop()-d(h).height();if(a.behavior&&this["_nearbottom_"+a.behavior]!==e)return this["_nearbottom_"+a.behavior].call(this);this._debug("math:",c,a.pixelsFromNavToBottom);return c-a.bufferPx<a.pixelsFromNavToBottom},
_pausing:function(a){var c=this.options;if(c.behavior&&this["_pausing_"+c.behavior]!==e)this["_pausing_"+c.behavior].call(this,a);else{"pause"!==a&&("resume"!==a&&null!==a)&&this._debug("Invalid argument. Toggling pause value instead");switch(a&&("pause"==a||"resume"==a)?a:"toggle"){case "pause":c.state.isPaused=!0;break;case "resume":c.state.isPaused=!1;break;case "toggle":c.state.isPaused=!c.state.isPaused}this._debug("Paused",c.state.isPaused);return!1}},_setup:function(){var a=this.options;if(a.behavior&&
this["_setup_"+a.behavior]!==e)this["_setup_"+a.behavior].call(this);else return this._binding("bind"),!1},_showdonemsg:function(){var a=this.options;a.behavior&&this["_showdonemsg_"+a.behavior]!==e?this["_showdonemsg_"+a.behavior].call(this):(a.loading.msg.find("img").hide().parent().find("div").html(a.loading.finishedMsg).animate({opacity:1},2E3,function(){d(this).parent().fadeOut("normal")}),a.errorCallback.call(d(a.contentSelector)[0],"done"))},_validate:function(a){for(var c in a)if(c.indexOf&&
-1<c.indexOf("Selector")&&0===d(a[c]).length)return this._debug("Your "+c+" found no elements."),!1;return!0},bind:function(){this._binding("bind")},destroy:function(){this.options.state.isDestroyed=!0;return this._error("destroy")},pause:function(){this._pausing("pause")},resume:function(){this._pausing("resume")},retrieve:function(a){var c=this,b=c.options,g=b.path,f,i,j,h,a=a||null;beginAjax=function(a){a.state.currPage++;c._debug("heading into ajax",g);f=d(a.contentSelector).is("table")?d("<tbody/>"):
d("<div/>");i=g.join(a.state.currPage);j="html"==a.dataType||"json"==a.dataType?a.dataType:"html+callback";a.appendCallback&&"html"==a.dataType&&(j+="+callback");switch(j){case "html+callback":c._debug("Using HTML via .load() method");f.load(i+" "+a.itemSelector,null,function(a){c._loadcallback(f,a)});break;case "html":c._debug("Using "+j.toUpperCase()+" via $.ajax() method");d.ajax({url:i,dataType:a.dataType,complete:function(a,b){(h="undefined"!==typeof a.isResolved?a.isResolved():"success"===b||
"notmodified"===b)?c._loadcallback(f,a.responseText):c._error("end")}});break;case "json":c._debug("Using "+j.toUpperCase()+" via $.ajax() method"),d.ajax({dataType:"json",type:"GET",url:i,success:function(b,d,g){h="undefined"!==typeof g.isResolved?g.isResolved():"success"===d||"notmodified"===d;a.appendCallback?a.template!=e?(b=a.template(b),f.append(b),h?c._loadcallback(f,b):c._error("end")):(c._debug("template must be defined."),c._error("end")):h?c._loadcallback(f,b):c._error("end")},error:function(){c._debug("JSON ajax request failed.");
c._error("end")}})}};if(b.behavior&&this["retrieve_"+b.behavior]!==e)this["retrieve_"+b.behavior].call(this,a);else{if(b.state.isDestroyed)return this._debug("Instance is destroyed"),!1;b.state.isDuringAjax=!0;b.loading.start.call(d(b.contentSelector)[0],b)}},scroll:function(){var a=this.options,c=a.state;a.behavior&&this["scroll_"+a.behavior]!==e?this["scroll_"+a.behavior].call(this):!c.isDuringAjax&&!c.isInvalidPage&&!c.isDone&&!c.isDestroyed&&!c.isPaused&&this._nearbottom()&&this.retrieve()},toggle:function(){this._pausing()},
unbind:function(){this._binding("unbind")},update:function(a){d.isPlainObject(a)&&(this.options=d.extend(!0,this.options,a))}};d.fn.infinitescroll=function(a,c){switch(typeof a){case "string":var b=Array.prototype.slice.call(arguments,1);this.each(function(){var c=d.data(this,"infinitescroll");if(!c||!d.isFunction(c[a])||"_"===a.charAt(0))return!1;c[a].apply(c,b)});break;case "object":this.each(function(){var b=d.data(this,"infinitescroll");b?b.update(a):(b=new d.infinitescroll(a,c,this),b.failed||
d.data(this,"infinitescroll",b))})}return this};var k=d.event,l;k.special.smartscroll={setup:function(){d(this).bind("scroll",k.special.smartscroll.handler)},teardown:function(){d(this).unbind("scroll",k.special.smartscroll.handler)},handler:function(a,c){var b=this,e=arguments;a.type="smartscroll";l&&clearTimeout(l);l=setTimeout(function(){d.event.handle.apply(b,e)},"execAsap"===c?0:100)}};d.fn.smartscroll=function(a){return a?this.bind("smartscroll",a):this.trigger("smartscroll",["execAsap"])}})(window,
jQuery);
/*
|--------------------------------------------------------------------------
| UItoTop jQuery Plugin 1.1
| http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
|--------------------------------------------------------------------------
*/

(function($){
	$.fn.UItoTop = function(options) {

 		var defaults = {
			text: 'To Top',
			min: 200,
			inDelay:600,
			outDelay:400,
  			containerID: 'toTop',
			containerHoverID: 'toTopHover',
			scrollSpeed: 1200,
			easingType: 'linear'
 		};

 		var settings = $.extend(defaults, options);
		var containerIDhash = '#' + settings.containerID;
		var containerHoverIDHash = '#'+settings.containerHoverID;
		
		$('body').append('<a href="#" id="'+settings.containerID+'">'+ "<div id='totop_image'><img src='http://static.tumblr.com/uiqhh9x/372m6hyqw/up.png' border='0'></div>" +'</a>');
		$(containerIDhash).hide().click(function(){
			$('html, body').animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		.prepend('<span id="'+settings.containerHoverID+'"></span>')
		.hover(function() {
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 1
				}, 600, 'linear');
			}, function() { 
				$(containerHoverIDHash, this).stop().animate({
					'opacity': 0
				}, 700, 'linear');
			});
					
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': $(window).scrollTop() + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).fadeIn(settings.inDelay);
			else 
				$(containerIDhash).fadeOut(settings.Outdelay);
		});

};
})(jQuery);


/*
 * jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
 *
 * Uses the built In easIng capabilities added In jQuery 1.1
 * to offer multiple easIng options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.extend( jQuery.easing,
{
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
