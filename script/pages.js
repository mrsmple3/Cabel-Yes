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
						delay: (index + 1) * 0.3, // задержка появления для каждого элемента
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

		function catalogSelect() {
			$(".filter__item").click(function () {
				$(this).toggleClass("active");
				$(".filter__item").not(this).removeClass("active");
			});

			$(".select__option").click(function () {
				var selectedOption = $(this).text();
				$(this).closest(".filter__item").find(".select__label").text(selectedOption);
			});
		}

		catalogSelect();

		function handleTabs($tabs, $tabsContent) {
			let $tabFlag = true;

			$tabs.each(function (index) {
				const currentTabContent = $tabsContent.eq(index);
				//activate tab with class "active"
				if ($(this).hasClass("active")) {
					currentTabContent.addClass("active");
				}
				$(this).click(function () {
					if (currentTabContent && $tabFlag) {
						//inactivate all tabs
						$tabs.removeClass("active");
						$tabsContent.removeClass("active");
						//activate
						$(this).addClass("active");
						currentTabContent.addClass("active");

						$tabFlag = false; //stop handle

						setTimeout(() => {
							$tabFlag = true;
						}, 500);
					}
				});
			});
		}

		handleTabs($(".tabs__btns .tabs__btn"), $(".tabs__content"));
	});
})(jQuery);
