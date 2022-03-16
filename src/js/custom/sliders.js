import {Swiper, Navigation, Autoplay} from "swiper";

Swiper.use([Navigation, Autoplay]);

export default function sliders() {
  reviewSliders();
  teamSliders();
  miniDocsSliders();
}

function reviewSliders() {
  const containers = Array.from(document.querySelectorAll('.js-init-review-slider'));
  containers.forEach(container => {
    const slider = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: false,
      autoplay: {
        delay: 5000
      },
      disableOnInteraction: true,
      navigation: {
        nextEl: container.querySelector('.slider-navigation__btn--next'),
        prevEl: container.querySelector('.slider-navigation__btn--prev'),
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1201: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      }
    })
  })
}

function teamSliders() {
  const containers = Array.from(document.querySelectorAll('.js-init-team-slider'));
  containers.forEach(container => {
    const slider = new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 15,
      autoHeight: false,
      autoplay: {
        delay: 5000
      },
      disableOnInteraction: true,
      navigation: {
        nextEl: container.querySelector('.slider-navigation__btn--next'),
        prevEl: container.querySelector('.slider-navigation__btn--prev'),
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        577: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        769: {
          slidesPerView: 4,
          spaceBetween: 35,
        },
        1025: {
          slidesPerView: 5,
          spaceBetween: 35,
        },
        1401: {
          slidesPerView: 6,
          spaceBetween: 40,
        }
      }
    })
  })
}

function miniDocsSliders() {
  const containers = Array.from(document.querySelectorAll('.js-init-mini-documents-slider'));
  containers.forEach(container => {
    const slider = new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 15,
      autoHeight: false,
      autoplay: {
        delay: 5000
      },
      disableOnInteraction: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        577: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        769: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1025: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1401: {
          slidesPerView: 5,
          spaceBetween: 40,
        }
      }
    })
  })
}