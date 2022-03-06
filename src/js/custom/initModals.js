import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalApi = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: (modal) => {
      closeMenu(menu);
    },
    afterClose: (modal) => {
      
    }
  });
}

const menu = document.querySelector('.menu');

function closeMenu(menu) {
  if (menu) {
    menu.classList.remove('opened');
  }
}