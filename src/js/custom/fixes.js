function setMainTopPadding() {
  const header = document.querySelector('.header');
  const main = document.querySelector('.page-main');

  if (main && header) {
    document.documentElement.style.setProperty('--js-header-height', `${header.clientHeight}px`);

    window.addEventListener(
      'resize',
      () => {
        document.documentElement.style.setProperty('--js-header-height', `${header.clientHeight}px`);
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