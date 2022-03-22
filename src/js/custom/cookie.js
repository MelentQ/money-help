export default function cookie() {
  const cookieElement = document.querySelector('.js-cookie');

  if (Number(cookieElement.dataset.timer) == -1) {
    return;
  }

  if (localStorage.getItem('cookieMessageShown')) {
    return;
  }

  const DELAY = Number(cookieElement.dataset.timer) * 1000 || 0;
  
  if (cookieElement) {
    const btn = cookieElement.querySelector('.cookie__close');
    btn.addEventListener('click', () => {
      cookieElement.classList.remove('visible');
      localStorage.setItem('cookieMessageShown', 'true');
    })
    const timer = setTimeout(() => {
      cookieElement.classList.add('visible');
    }, DELAY);
  }
}