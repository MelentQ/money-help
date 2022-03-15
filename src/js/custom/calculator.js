import noUiSlider from 'noUiSlider';
import { postfix, monthPostfixes } from '../build-in/utilities';

export default function calculator() {
  const containers = Array.from(document.querySelectorAll('.js-init-calculator'));
  containers.forEach(container => {
    // Элементы для вывода результатов
    const diffRateValueElem = container.querySelector('.js-diff-rate-value');
    const diffPaymentValueElem = container.querySelector('.js-diff-payment-value');
    const annRateValueElem = container.querySelector('.js-ann-rate-value');
    const annPaymentValueElem = container.querySelector('.js-ann-payment-value');

    // Инициализация слайдеров
    let sumRange = {};
    let monthRange = {};
    const rangeSliders = Array.from(container.querySelectorAll('.js-range-slider-container'));
    rangeSliders.forEach(rs => {
      const isSumRange = rs.id === "sum-range";
      const isMonthRange = rs.id === "month-range";

      const min = Number(rs.dataset.min) || 0;
      const max = Number(rs.dataset.max) || 10;
      const start = Number(rs.dataset.start) || min;
      const step = Number(rs.dataset.step) || 1;

      const input = rs.querySelector('.js-range-input');
      const value = rs.querySelector('.js-range-value');
      const rangeElem = rs.querySelector('.js-range-elem');

      const range = noUiSlider.create(
        rangeElem, {
          start,
          step,
          connect: 'lower',
          range: {
            min,
            max
          }
      });

      if (isSumRange) {
        rs.querySelector('.js-min-label').textContent = `от ${min.toLocaleString('ru')} ₽`;
        rs.querySelector('.js-max-label').textContent = `до ${max.toLocaleString('ru')} ₽`;

        sumRange = range;
      }

      if (isMonthRange) {
        rs.querySelector('.js-min-label').textContent = `от ${min} ${min % 10 === 1 && min % 100 != 11 ? "месяца" : "месяцев"}`;
        rs.querySelector('.js-max-label').textContent = `до ${max} ${max % 10 === 1 && max % 100 != 11 ? "месяца" : "месяцев"}`;

        monthRange = range;
      }

      range.on('update', (values) => {
        if (value) {
          if (isMonthRange) {
            value.textContent = `${Math.round(values[0])} ${postfix(Math.round(values[0]), monthPostfixes)}`;
          } else {
            value.textContent = Math.round(values[0]);
          }
        }
        if (input) {
          input.value = Math.round(values[0]);
          setSize(input);
        }
      })

      if (input) {
        input.value = start;
        setSize(input);

        input.addEventListener('change', () => {
          range.set(input.value);
          setSize(input);
        })
    
        input.addEventListener('input', () => {
          setSize(input);
        })
      }
    })

    // Вывод результатов
    if (sumRange && monthRange) {
      sumRange.on('update', (values) => {
        getRes(sumRange.get(), monthRange.get(), diffRateValueElem, diffPaymentValueElem, annRateValueElem, annPaymentValueElem);
      })
      monthRange.on('update', (values) => {
        getRes(sumRange.get(), monthRange.get(), diffRateValueElem, diffPaymentValueElem, annRateValueElem, annPaymentValueElem);
      })
    }
  })
}

function getRes(sum, month, diffRateElem, diffPaymentElem, annRateElem, annPaymentElem) {
  const result = window.calculate(sum, month);
  diffRateElem.textContent = `${result.diff.rate}%`;
  diffPaymentElem.textContent = `${result.diff.payment.toLocaleString('ru')} ₽`;

  annRateElem.textContent = `${result.ann.rate}%`;
  annPaymentElem.textContent = `${result.ann.payment.toLocaleString('ru')} ₽`;
}

function setSize(input) {
  input.size = input.value.length || 1;
}