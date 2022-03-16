import {Swiper, Navigation, Autoplay} from "swiper";

Swiper.use([Navigation, Autoplay]);

export default function sliders() {
  reviewSliders();
}

function reviewSliders() {
  const containers = Array.from(document.querySelectorAll('.js-init-review-slider'));
  containers.forEach(container => {
    const slider = new Swiper(container, {
      slidesPerView: 3,
      spaceBetween: 40,
      autoHeight: false,
      autoplay: {
        delay: 5000
      },
      disableOnInteraction: true,
      navigation: {
        nextEl: container.querySelector('.slider-navigation__btn--next'),
        prevEl: container.querySelector('.slider-navigation__btn--prev'),
      }
    })
  })
}