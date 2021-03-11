(function ($) {
	$.calculate = function (element, target, options) {
		var defaults = {
			limit: 0,
			whitespaces: true,
		};
		var options = $.extend(defaults, options);
		var $element = $(element);
		if (!$element.is('input,select,textarea')) {
			throw new Error(`Invalid element type: ${element.tagName}!`);
		}
		if (!isNaN(target) || target === undefined) {
			throw new Error(`This field is not true`);
		}
		$element.on('paste keyup change', function () {
			setTimeout(function () { CharCounter($element, target, options.limit, options.whitespaces) }, 10);
		});
		CharCounter = function (element, target, limit, whitespaces) {
			let htmlResult, text = element.val(), textLength = text.length;
			if (whitespaces && limit > 0) {
				textLength = text.replace(/\s/g, '').length;
				htmlResult = `<span>${textLength}/${limit}</span>`;
				if (textLength > limit) {
					var spaces = text.match(/\s/g) ? text.match(/\s/g).length : 0;
					element.val(text.substr(0, 500 + spaces));
					htmlResult = `<span>${limit}/${limit}</span>`;
				}
			} else if (whitespaces) {
				textLength = text.replace(/\s/g, '').length;
				htmlResult = `<span>${textLength}</span>`;

			} else if (limit > 0) {
				htmlResult = `<span>${textLength}/${limit}</span>`;
				if (textLength > limit) {
					element.val(text.substr(0, 500));
					htmlResult = `<span>${limit}/${limit}</span>`;
				}
			} else {
				htmlResult = `<span>${textLength}</span>`;
			}
			$(target).html(htmlResult)
		}
	}
	$.fn.calculate = function (target, options) {
		return this.each(function () {
			$.calculate(this, target, options);
		});
	}
})(jQuery);
