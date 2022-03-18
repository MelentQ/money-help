import {Swiper, Navigation, Autoplay, FreeMode} from "swiper";

Swiper.use([Navigation, Autoplay, FreeMode]);

export default function sliders() {
  reviewSliders();
  teamSliders();
  miniDocsSliders();
  casesSliders();
  initSliderTabs();
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

function casesSliders() {
  const containers = Array.from(document.querySelectorAll('.js-init-cases-slider'));
  containers.forEach(container => {
    const navContainer = container.closest('.js-slider-navigation-parent');

    const slider = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: true,
      autoplay: {
        delay: 5000
      },
      loop: true,
      disableOnInteraction: true,
      navigation: {
        nextEl: navContainer ? navContainer.querySelector('.slider-navigation__btn--next') : null,
        prevEl: navContainer ? navContainer.querySelector('.slider-navigation__btn--prev') : null,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1201: {
          slidesPerView: 1,
          spaceBetween: 40,
        }
      }
    })
  })
}

function initSliderTabs() {
  if (window.matchMedia("(max-width: 1024px)").matches) {
    const containers = Array.from(document.querySelectorAll('.js-init-slider-tabs'));
    containers.forEach(container => {
      const slider = new Swiper(container, {
        slidesPerView: 'auto',
        spaceBetween: 14,
        freeMode: {
          enabled: true,
          sticky: true
        },
        breakpoints: {
          641: {
            spaceBetween: 24
          }
        }
      })

      slider.slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
          slider.slideTo(i);
        })
      })
    })
  }
}