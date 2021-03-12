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
		if (target === undefined) {
			throw new Error("This element doesn't exist");
		}
		$element.on('paste keyup keypress change', function () {
			CharCounter($element, target, options.limit, options.whitespaces)
		});
		CharCounter = function (element, target, limit, whitespaces) {
			let text = element.val(),
				textLength = (whitespaces ? text.replace(/\s/g, '').length : text.length),
				htmlResult = `<span>${textLength}/${limit}</span>`;
			if (whitespaces && limit > 0) {
				if (textLength > limit) {
					let position = limit;
					let subStrText = text.substr(0, position)
					while (subStrText.replace(/\s/g, '').length < limit) {
						subStrText = text.substr(0, position++);
					}
					element.val(subStrText);
					htmlResult = `<span>${limit}/${limit}</span>`;
				}
			} else if (whitespaces) {
				htmlResult = `<span>${textLength}</span>`;
			} else if (limit > 0) {
				if (textLength > limit) {
					element.val(text.substr(0, limit));
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
