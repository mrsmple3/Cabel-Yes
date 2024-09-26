(function ($) {
	$(document).ready(function () {
		let minWidthMobile = window.innerWidth < 1025 ? false : true;
		window.addEventListener("resize", function () {
			minWidthMobile = window.innerWidth < 1025 ? false : true;
		});

		if ($(".catalog-page__cards__item")) {
			const items = gsap.utils.toArray(".catalog-page__cards__item");

			items.forEach((item, index) => {
				gsap.fromTo(
					item,
					{
						opacity: 0,
						y: 30,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.3,
						delay: index * 0.2, // задержка появления для каждого элемента
					}
				);
			});
		}
		//Dropdown
		if (minWidthMobile) {
			$(".calculator-page__card__item.w-d").hover(
				function () {
					// over
					$(".calculator-page__card__item.w-d").removeClass("active");
					$(this).addClass("active");
				},
				function () {
					// out
					$(".calculator-page__card__item.w-d").removeClass("active");
				}
			);
		} else {
			$(".calculator-page__card__item.w-d").click(function (e) {
				e.preventDefault();

				if ($(this).hasClass("active")) {
					$(".calculator-page__card__item.w-d").removeClass("active");
				} else {
					$(".calculator-page__card__item.w-d").removeClass("active");
					$(this).addClass("active");
				}
			});
		}

		// Закрытие dropdown при клике вне элемента
		$(document).on("click", function (e) {
			// Проверяем, произошел ли клик вне элемента с классом .calculator-page__card__item.w-d
			if (!$(e.target).closest(".calculator-page__card__item.w-d").length) {
				$(".calculator-page__card__item.w-d").removeClass("active");
			}
		});

		$(".calculator-page__card__item.w-d .dropdown__item").on("click", function (event) {
			event.preventDefault();
			const selectedValue = $(this).data("value");
			const mainContainer = $(this).closest(".calculator-page__card__item.w-d");
			mainContainer.find("input").val(selectedValue);
			mainContainer.removeClass("active");
		});
	});
})(jQuery);
