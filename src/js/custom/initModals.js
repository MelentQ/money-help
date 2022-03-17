import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalApi = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: (modal) => {
      setCardModal(modal);
    },
    afterClose: (modal) => {
      
    }
  });
}

function setCardModal(modal) {
  if (modal.openedWindow.id == "cardInfo") {
    const cardElement = modal.starter;
    const modalElement = modal.openedWindow;

    // title
    modalElement.querySelector('.modal__title').innerHTML = cardElement.querySelector('.cards__item-name').textContent;

    // description
    const desc = cardElement.querySelector('.cards__item-description');
    if (desc)
      modalElement.querySelector('.modal__description').innerHTML = desc.textContent;

    // textContent
    modalElement.querySelector('.modal__content-block').innerHTML = cardElement.querySelector('.cards__modal-content').innerHTML;
  }
}