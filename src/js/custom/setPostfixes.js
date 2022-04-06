export default function setPostfixes(cityName) {
  // Получаем данные с постфиксами и селекторами
  const selectorsUrlElement = document.querySelector('#selectors');
  const postfixesUrlElement = document.querySelector('#postfixes');
  if (selectorsUrlElement && postfixesUrlElement) {
    Promise.all([
      fetch(selectorsUrlElement.dataset.url).then(res => res.json()),
      fetch(postfixesUrlElement.dataset.url).then(res => res.json())
    ])
      .then(([selectors, postfixes]) => {
        let pfx = "";

        postfixes.forEach(postfix => {
          if (postfix.city == cityName) {
            pfx = postfix.postfix;
          }
        })

        selectors.forEach(selector => {
          const elements = Array.from(document.querySelectorAll(selector));
          elements.forEach(element => {
            // Для сохранения состояния будем записывать pfx в dataset
            if (element.dataset.pfx) {
              element.textContent = element.textContent.replace(element.dataset.pfx, pfx);
            } else {
              element.textContent += " " + pfx;
            }
            element.dataset.pfx = pfx;
          })
        })
      })
      .catch(err => {
        console.warn(err);
      })
  }
}

window.setPostfixes = setPostfixes;