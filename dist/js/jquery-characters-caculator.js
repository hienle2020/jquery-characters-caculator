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
					let position = 500;
					let subStrText = text.substr(0, position)
					while (subStrText.replace(/\s/g, '').length < 500) {
						subStrText = text.substr(0, position++);
					}
					element.val(subStrText);
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
