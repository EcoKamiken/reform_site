// Slider
var swiper = new Swiper('.swiper-container-slide', {
  effect: "slide",
  speed: 600,
  loop: true,
  slidesPerView: 2,
  spaceBetween: 2,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    1023: {
      slidesPerView: 1,
      spaceBetween: 0
    },
  },
})

var swiper = new Swiper('.swiper-container-fade', {
  effect: "fade",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  speed: 600,
})