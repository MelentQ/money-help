export default function toggleMenu() {
  const menu = document.querySelector('.menu');
  const openMenuBtn = document.querySelector('.js-open-menu');

  if (menu && openMenuBtn) {
    const closeMenuBtn = menu.querySelector('.js-close-menu');

    openMenuBtn.addEventListener('click', () => {
      menu.classList.add('opened');
    })

    closeMenuBtn.addEventListener('click', () => {
      menu.classList.remove('opened');
    })

    window.addEventListener('click', e => {
      const target = e.target
      if (!target.closest('.js-open-menu') && !target.closest('.menu')) {
        menu.classList.remove('opened');
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.classList.remove('opened');
      }
    })
  }
}