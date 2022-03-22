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
    const tableModal = container.querySelector('.js-table');

    if (sumRange && monthRange) {
      sumRange.on('update', (values) => {
        getRes(container.dataset.name, sumRange.get(), monthRange.get(), diffRateValueElem, diffPaymentValueElem, annRateValueElem, annPaymentValueElem, tableModal);
      })
      monthRange.on('update', (values) => {
        getRes(container.dataset.name, sumRange.get(), monthRange.get(), diffRateValueElem, diffPaymentValueElem, annRateValueElem, annPaymentValueElem, tableModal);
      })
    }
    const form = container.querySelector('form');
    form.addEventListener('keydown', function(event) {
      if(event.key === 'Enter') {
        event.preventDefault();
        if (form.sum) {
          form.sum.blur();
        }
        getRes(container.dataset.name, sumRange.get(), monthRange.get(), diffRateValueElem, diffPaymentValueElem, annRateValueElem, annPaymentValueElem, tableModal);
      }
    });
  })
}

function getRes(name, sum, month, diffRateElem, diffPaymentElem, annRateElem, annPaymentElem, tableModal) {
  const result = window.calculate(name, sum, month);

  // Diff
  diffRateElem.textContent = `${result.diff.rate}%`;
  diffPaymentElem.textContent = `${result.diff.payment.toLocaleString('ru')} ₽`;

  // Modal Diff
  if (tableModal) {
    const diffPayments = result.diff.payments;
    tableModal.innerHTML = "";
    const head = _getTemplateBySelector('#tableHead');

    tableModal.append(head);

    diffPayments.forEach((payment, i) => {
      const row = _getTemplateBySelector('#tableRow');
      const monthElement = row.querySelector('.modal__table-cell--month');
      const paymentElement = row.querySelector('.modal__table-cell--payment');

      monthElement.textContent = i + 1;
      paymentElement.textContent = `${payment.toLocaleString('ru')} ₽`;
      tableModal.append(row);
    });
  }

  // Ann
  annRateElem.textContent = `${result.ann.rate}%`;
  annPaymentElem.textContent = `${result.ann.payment.toLocaleString('ru')} ₽`;
}

function setSize(input) {
  input.size = input.value.length || 1;
  if (input.value.length > 8) {
    input.size = 8;
  }
}

function _getTemplateBySelector(templateSelector) {
  return document
  .querySelector(templateSelector)
  .content
  .children[0]
  .cloneNode(true);
}