document.addEventListener("DOMContentLoaded", function () {
	function size(px) {
		const conversionFactor = 24;
		const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
		return (px / conversionFactor) * index;
	}

	let minWidthMobile = window.innerWidth < 1025 ? false : true;

	// Функция для обновления слайдера, если он существует
	function updateSlider(sliderInstance, selector) {
		if (document.querySelector(selector)) {
			sliderInstance.update();
		}
	}

	window.addEventListener("resize", function () {
		minWidthMobile = window.innerWidth < 1025 ? false : true;
		updateSlider(sliderMainImgs, ".swiper.main__slider");
		updateSlider(sliderRecommendation, ".swiper.recommendation__slider");
		updateSlider(sliderOffer, ".offer__slider .swiper");
		updateSlider(sliderCertificate, ".swiper.certificates-page__slider");
	});

	const sliderMainImgs = new Swiper(".swiper.main__slider", {
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".main__slider__btn-next",
			prevEl: ".main__slider__btn-prev",
		},
		slidesPerView: 1,
		initialSlide: 0,
		speed: 1300,
		parallax: true,
		spaceBetween: 1,
		loop: true,
	});

	const sliderRecommendation = new Swiper(".swiper.recommendation__slider", {
		navigation: {
			nextEl: ".recommendation__btn__next",
			prevEl: ".recommendation__btn__prev",
		},
		slidesPerView: minWidthMobile ? 4 : 2,
		speed: 1300,
		spaceBetween: size(23),
		loop: true,
	});

	const sliderOffer = new Swiper(".offer__slider .swiper", {
		navigation: {
			nextEl: ".offer__slider__prev",
			prevEl: ".offer__slider__next",
		},
		direction: "vertical",
		slidesPerView: 4,
		speed: 1300,
		spaceBetween: minWidthMobile ? size(10) : 10,
	});

	const sliderCertificate = new Swiper(".swiper.certificates-page__slider", {
		navigation: {
			nextEl: ".certificates__btn__next",
			prevEl: ".certificates__btn__prev",
		},
		slidesPerView: minWidthMobile ? 4 : 2,
		speed: 1300,
		spaceBetween: size(32),
		loop: true,
	});
});
