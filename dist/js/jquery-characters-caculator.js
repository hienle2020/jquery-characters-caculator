(function ($) {
	$.calculate = function (element, target, options) {
		options = $.extend({
			limit: 0,
			whitespaces: true,
		}, options);
		var $element = $(element);
		if (!$element.is('input,select,textarea')) {
			throw new Error(`Invalid element type: ${element.tagName}!`);
		}
		$element.on('paste keyup keypress change', function () {
			CharCounter($element, target, options.limit, options.whitespaces)
		});
		CharCounter = function (element, target, limit, whitespaces) {
			var text = (whitespaces ? element.val().replace(/\s/g, '') : element.val());
			if (limit > 0) {
				if (text.length > limit) {
					let position = limit;
					let subStrText = element.val().substr(0, position);
					if(whitespaces){
						while (subStrText.replace(/\s/g, '').length < limit) {
							subStrText = element.val().substr(0, position++);
						}
					}
					element.val(subStrText);
					$(target).html(`<span>${limit}/${limit}</span>`);
				} else {
					$(target).html(`<span>${text.length}/${limit}</span>`);
				}
			} else {
				$(target).html(`<span>${text.length}</span>`);
			}
		}
	}
	$.fn.calculate = function (target, options) {
		return this.each(function () {
			$.calculate(this, target, options);
		});
	}
})(jQuery);
