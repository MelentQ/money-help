export default function textOverflow() {
  const elems = Array.from(document.querySelectorAll('.js-text-overflow'));
  elems.forEach(elem => {
    const text = elem.querySelector('.js-text');

    function check() {
      if (text.clientHeight < text.scrollHeight) {
        elem.classList.add('overflow-active');
      }
    }

    check();

    window.addEventListener('resize', check);

    const btn = elem.querySelector('.js-btn');
    btn.addEventListener('click', () => {
      elem.classList.toggle('opened');
    })
  })
}