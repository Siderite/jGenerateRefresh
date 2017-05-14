/**
 * generate refresh event plugin
 *
 * Copyright (c) 2009 Siderite (http://siderite.blogspot.com)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/**
 * Runs a periodic check on any change in position or size of the element
 * and, on change, fires the 'refresh' event.
 *
 * @example :
 *
 * $(function() { 
 *	$('#target').bind('refresh',{},someRefreshFunction);
 *	$('#target').generateRefreshEvent(100); // every 100 milliseconds
 *	});
 * 
 * @name backgroundImage
 * @author Siderite (http://siderite.blogspot.com)
 */

(function($){   
    $.fn.generateRefreshEvent = function(options) {
        var defaults = {
            interval: 500
        };
        if (typeof (options) == 'number') options = { interval: options };
        options = $.extend(defaults, options);

        return this.each(function() {
            $.fn.generateRefreshEvent.apply(this, options);
        });
    };

    $.fn.generateRefreshEvent.apply = function(elem, options) {
        if (elem.refreshInterval) clearInterval(elem.refreshInterval);
        elem.refreshInterval = setInterval(function() { $.fn.generateRefreshEvent.check(elem); }, options.interval);
    }

    $.fn.generateRefreshEvent.check = function(elem) {
        var obj = $(elem);
        var pos = obj.offset();
        var actualPosition = { top: pos.top, left: pos.left, width: obj.width(), height: obj.height() };
        if (elem.previousPosition) {
            var previousPosition = elem.previousPosition;
            if (actualPosition.top != previousPosition.top ||
        actualPosition.left != previousPosition.left ||
        actualPosition.width != previousPosition.width ||
        actualPosition.height != previousPosition.height) {
                obj.trigger('refresh');
            }
        }
        elem.previousPosition = actualPosition;
    };
})(jQuery);  
