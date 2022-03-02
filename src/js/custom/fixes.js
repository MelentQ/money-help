function setMainTopPadding() {
  const header = document.querySelector('.header');
  const main = document.querySelector('.page-main');

  if (main && header) {
    main.style.paddingTop = `${header.clientHeight}px`;

    window.addEventListener(
      'resize',
      () => {
        main.style.paddingTop = `${header.clientHeight}px`;
      },
      {
        passive: true
      }
    );
  }
}

export {
  setMainTopPadding
}