import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalApi = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: (modal) => {

    },
    afterClose: (modal) => {
      
    }
  });
}