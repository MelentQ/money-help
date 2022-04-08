import setPostfixes from "./setPostfixes";

export default function city() {
  const select = document.querySelector('.js-select-city');
  const selectedsInHeader = Array.from(document.querySelectorAll('.js-city'));

  if (select && selectedsInHeader.length) {
    const DELAY = Number(select.dataset.timer) * 1000 || 0;

    if (DELAY != "-1000") {
      // автооткрытие
      // if (!getCookie(select.dataset.name)) {
      //   const miniModal = document.querySelector('.js-mini-city-modal');
      //   const acceptBtn = miniModal.querySelector('.js-accept');
      //   const otherBtn = miniModal.querySelector('.js-other');
      //   acceptBtn.addEventListener('click', () => {
      //     miniModal.classList.remove('active');
      //   });
      //   otherBtn.addEventListener('click', () => {
      //     miniModal.classList.remove('active');
      //     window.modalApi.open('#calc');
      //   });

      //   let timer;
      //   timer = setTimeout(() => {
      //     miniModal.classList.add('active');
      //   }, DELAY);

      //   selectedsInHeader.forEach(btn => {
      //     btn.addEventListener('click', () => {
      //       clearTimeout(timer);
      //     })
      //   })
      // }
    }

    const options = Array.from(select.querySelectorAll('.select__item'));
    const btn = select.querySelector('.select__button');
    const btnLabel = btn.querySelector('.select__button-label');
    const content = select.querySelector('.select__content');

    if(getCookie(select.dataset.name)) {
      selectedsInHeader.forEach(selectedInHeader => {
        selectedInHeader.textContent = getCookie(select.dataset.name);
      })
      btnLabel.textContent = getCookie(select.dataset.name);

      options.forEach((option) => {
        if (option.textContent === getCookie(select.dataset.name)) {
          option.classList.add('active');
        } else {
          option.classList.remove('active');
        }
      })
    }

    options.forEach((option, i) => {
      option.addEventListener('click', () => {
        btnLabel.textContent = option.textContent;
        selectedsInHeader.forEach(selectedInHeader => {
          selectedInHeader.textContent = option.textContent;
        })

        window.modalApi.close();
        select.classList.remove('active');
        content.style.height = "0";

        document.cookie = `city=${encodeURIComponent(option.textContent)}`;
        console.log(option.textContent);
        setPostfixes(option.textContent);

        options.forEach((o, j) => {
          if (j == i) {
            o.classList.add('active');
          } else {
            o.classList.remove('active');
          }
        })
      })
    })
  }
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}