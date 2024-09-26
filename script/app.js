(function ($) {
	let $minWidthMobile = window.innerWidth < 1050 ? false : true;

	window.addEventListener("resize", function () {
		$minWidthMobile = window.innerWidth < 1050 ? false : true;
	});
	$(document).ready(function () {
		function size(px) {
			const conversionFactor = 24;
			const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
			return (px / conversionFactor) * index;
		}

		const $header = $("header");
		const $headerHeight = $header.outerHeight();
		const $headerLogo = $("header .logo");
		const $headerTopHeight = $("header .header__top").outerHeight();

		function handleScroll($setTop) {
			const scrollTop = $(window).scrollTop();
			if (scrollTop >= $setTop) {
				$header.css("top", `-${$setTop}px`);
			} else {
				$header.css("top", "0");
			}
		}

		gsap.registerPlugin(ScrollTrigger, Observer);

		let animationRunning = false;

		const mainBlockGsap = gsap.timeline(
			{ defaults: { delay: 0.1 } },
			{
				paused: true,
				onStart: () => {
					animationRunning = true;
				},
				onComplete: () => {
					mainBlockGsap.kill();
					animationRunning = false;
				},
			}
		);

		mainBlockGsap
			.fromTo(
				".logo",
				{
					opacity: 0,
					y: "-100%",
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.3,
				}
			)
			.fromTo(
				"header",
				{
					opacity: 0,
					y: 30,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.3,
				}
			)

			.fromTo(
				"main",
				{
					opacity: 0,
					y: 30,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.3,
				}
			)
			.fromTo(
				".yes",
				{
					x: "-100%",
					duration: 0.3,
				},
				{
					x: 0,
					duration: 0.3,
				}
			);

		gsap.fromTo(
			".questions .fon-questions",
			{ scale: 1 },
			{
				scale: 1.1,
				duration: 10, // длительность анимации в секундах
				yoyo: true, // анимация будет возвращаться обратно
				repeat: -1, // бесконечная анимация
				ease: "power2.inOut", // плавное изменение
			}
		);

		gsap.fromTo(
			".img-quality",
			{ scale: 1 },
			{
				scale: 1.1,
				duration: 10, // длительность анимации в секундах
				yoyo: true, // анимация будет возвращаться обратно
				repeat: -1, // бесконечная анимация
				ease: "power2.inOut", // плавное изменение
			}
		);

		//!Header
		if ($minWidthMobile) {
			gsap.to("header", {
				boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.07)",
				scrollTrigger: {
					trigger: "header .menu",
					start: "top top",
					end: "top top",
					scrub: true,
				},
			});

			$(window).on("scroll", handleScroll);

			Observer.create({
				target: window,
				type: "wheel,touch,scroll",
				onUp: () => {
					handleScroll("0");
				},
				onDown: () => {
					handleScroll($headerTopHeight);
				},
			});
		}

		$("header .search").click(function (event) {
			event.stopPropagation();
			const $searchHeader = $(this);
			if ($(".header__search-form").hasClass("active")) {
				//disactive
				$(".header__search-form").removeClass("active");
				$(this).removeClass("active");
				$("header").css("background", "#f1f3ff");
			} else {
				//active
				$(".header__search-form").addClass("active");
				$(this).addClass("active");
				$(".header__search-form").find("input").focus();
				$("header").css("background", "white");
			}
			$("header .icon-x").click(function () {
				$(".header__search-form").removeClass("active");
				$searchHeader.removeClass("active");
				$("header").css("background", "#f1f3ff");
			});
		});

		//!Mobile Dropdown
		$(".dropdown-lang").click(function (event) {
			event.stopPropagation();
			$(this).toggleClass("active");
		});

		$(".menu-btn").click(function (event) {
			$(this).toggleClass("active");
			$(".mobile-menu").toggleClass("active");
			$("body").toggleClass("overflow-hidden");
		});
		function format_number(x) {
			return x.toString();
		}

		function getClassNames(element) {
			return $(element).prop("class"); // Правильный способ получения классов
		}

		//!Hover Header
		function startTimeout(submenu, link, timeoutVar) {
			if (timeoutVar) {
				clearTimeout(timeoutVar);
			}
			timeoutVar = setTimeout(() => {
				link.removeClass("active");
				submenu.removeClass("active");
			}, 500);
			return timeoutVar;
		}

		function handleNestedLinks($element) {
			$element.each(function () {
				const $link = $(this);
				const $submenu = $link.next(".submenu-nested__container");

				// Убедиться, что событие еще не добавлено
				if (!$link.data("clickHandled")) {
					$link.click(function (event) {
						event.preventDefault();
						if ($link.hasClass("active")) {
							$link.removeClass("active");
							$submenu.removeClass("active");
						} else {
							// Удаляем классы 'active' у соседних вложенных подменю
							$link
								.closest(".for-nested")
								.children(".submenu-nested")
								.each(function () {
									const $nestedContainer = $(this).find(".submenu-nested__container").first();
									const $nestedLink = $(this).find(".submenu-nested_link").first();
									// Убедиться, что это не текущий элемент
									if (!$nestedContainer.is($submenu) && !$nestedLink.is($link)) {
										$nestedContainer.removeClass("active");
										$nestedLink.removeClass("active");
									}
								});

							$link.addClass("active");
							$submenu.addClass("active");
						}
					});

					// Помечаем, что клик уже обработан
					$link.data("clickHandled", true);
				}

				// Рекурсивно обрабатываем вложенные ссылки
				const $nestedLinks = $submenu.find(".submenu-nested_link");
				if ($nestedLinks.length > 0) {
					handleNestedLinks($nestedLinks);
				}
			});
		}

		function hoverNestedLink($element, $timeoutsArray) {
			$element.each(function () {
				const $link = $(this);
				const $submenu = $link.next(".submenu-nested__container");

				if ($submenu.length > 0) {
					$link.hover(
						function () {
							// over
							// Найти все активные элементы внутри того же уровня вложенности, что и текущий $link, и удалить у них класс "active"
							$link
								.closest(".for-nested")
								.children(".submenu-nested")
								.each(function () {
									const $nestedContainer = $(this).find(".submenu-nested__container").first();
									const $nestedLink = $(this).find(".submenu-nested_link").first();

									// Убедиться, что это не текущий элемент, прежде чем удалять классы
									if (!$nestedContainer.is($submenu) && !$nestedLink.is($link)) {
										$nestedContainer.removeClass("active");
										$nestedLink.removeClass("active");
									}
								});

							$timeoutsArray.forEach((item) => {
								clearTimeout(item);
							});

							$link.addClass("active");
							$submenu.addClass("active");
						},
						function () {
							let timeout;
							// Hover out - start timeout for submenu and link
							timeout = startTimeout($submenu, $link, timeout);
							$timeoutsArray.push(timeout); // Add timeout to the array
						}
					);

					$submenu.hover(
						function () {
							// Hover in - clear timeouts for submenu
							$timeoutsArray.forEach((item) => clearTimeout(item));
						},
						function () {
							let timeout1;
							// Hover out - start timeout for nested submenu
							timeout1 = startTimeout($submenu, $link, timeout1);
							$timeoutsArray.push(timeout1); // Add timeout for nested submenu
						}
					);

					// Recursively handle nested links
					const $nestedLinks = $submenu.find(".submenu-nested_link");
					if ($nestedLinks.length > 0) {
						hoverNestedLink($nestedLinks, $timeoutsArray);
					}
				}
			});
		}

		$("header")
			.find(".submenu__title")
			.each(function (index) {
				const $link = $(this);
				const $submenu = $(this).closest(".submenu").find(".submenu__container");
				let mainTimeout;

				if ($submenu.length > 0) {
					$link.hover(
						function () {
							// over
							$(".submenu__container, .submenu__title").removeClass("active");

							clearTimeout(mainTimeout);
							$link.addClass("active");
							$submenu.addClass("active");
						},
						function () {
							// out
							mainTimeout = startTimeout($submenu, $(this), mainTimeout);
						}
					);
					$submenu.hover(
						function () {
							// over
							clearTimeout(mainTimeout);
						},
						function () {
							// out
							mainTimeout = startTimeout($submenu, $link, mainTimeout);
						}
					);
					const $timeoutsArray = [mainTimeout];
					hoverNestedLink($submenu.find(".submenu-nested_link"), $timeoutsArray);
				}
			});

		//!Hover Mobile
		$(".mobile-menu")
			.find(".submenu__title")
			.each(function () {
				const $link = $(this);
				const $submenu = $(this).next(".submenu__container");
				if ($submenu.length > 0) {
					$link.click(function (event) {
						event.preventDefault();
						if ($link.hasClass("active")) {
							$link.removeClass("active");
							$submenu.removeClass("active");
						} else {
							$(".submenu__container, .submenu__title").removeClass("active");
							$link.addClass("active");
							$submenu.addClass("active");
						}
					});

					handleNestedLinks($submenu.find(".submenu-nested_link"));
				}
			});

		//!numerical
		if ($(".benefits__nums .num").length > 0) {
			$(".benefits__nums .num").each(function () {
				var $counter = $(this);
				var value = { val: parseInt($counter.text()) };

				// Function to start the animation
				function startAnimation() {
					gsap.from(value, {
						duration: 3,
						ease: "circ.out",
						val: 0,
						roundProps: "val",
						onUpdate: function () {
							$counter.text(format_number(value.val));
						},
					});
				}

				// Create an Intersection Observer instance
				var observer = new IntersectionObserver(
					function (entries) {
						if (entries[0].isIntersecting) {
							startAnimation();
							observer.disconnect(); // Stop observing after the animation starts
						}
					},
					{ threshold: 0.5 } // Adjust this value to determine when the animation should start
				);

				// Start observing the counter element
				observer.observe(this);
			});
		}
		//!Catalog Products
		$(".catalog-products-page__cards__item").each(function () {
			const $item = $(this);
			const $downloadLink = $item.find(".item__download-link");
			const $image = $item.find(".item__img");
			const url = $image.data("url");

			// Если у изображения есть data-url, делаем кликабельным элемент .item__download-link
			if (url) {
				$downloadLink.on("click", function (event) {
					event.preventDefault();
					console.log(url);
					window.location.href = url; // Перенаправляем на ссылку из data-url
				});
			}
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
	});
})(jQuery);
