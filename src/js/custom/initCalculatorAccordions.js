import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function initCalculatorAccordions() {
  const SPEED = 0.3;

  const openAccordion = (element) => {
    gsap.to(element, {
        height: 'auto',
        duration: SPEED,
        onComplete: () => ScrollTrigger.refresh(),
    });
  };
  const closeAccordion = (element) => {
      gsap.to(element, {
          height: window.matchMedia("(max-width: 768px)").matches ? 18 : 24,
          duration: SPEED,
          onComplete: () => ScrollTrigger.refresh(),
      });
  };

  const contents = Array.from(document.querySelectorAll('.js-calculator-accordion-content'));

  window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 1025px)").matches) {
      contents.forEach(content => {
        content.style.height = 'auto';
      })
    }
  })

  document.addEventListener('click', (event) => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      if (event.target.matches('.js-calculator-accordion-btn') || event.target.closest('.js-calculator-accordion-btn')) {
        const btn = event.target.matches('.js-calculator-accordion-btn') ? event.target : event.target.closest('.js-calculator-accordion-btn');
        const element = btn.closest('.js-calculator-accordion');
        const content = element.querySelector('.js-calculator-accordion-content');
        const elements = Array.from(document.querySelectorAll('.js-calculator-accordion'));

        event.preventDefault();

        if (element.hasAttribute('data-close-other')) {
            elements.forEach((otherElement) => {
                if (otherElement !== element) {
                    if (otherElement.classList.contains('active')) {
                        const content = otherElement.querySelector('.js-calculator-accordion-content');
                        closeAccordion(content);
                        otherElement.classList.remove('active');
                    }
                }
            });
        }

        if (element.classList.contains('active')) {
            closeAccordion(content);
        } else {
            openAccordion(content);
        }
        element.classList.toggle('active');
      }
    }
  });

  const containers = Array.from(document.querySelectorAll('.js-calculator-accordion'));
  containers.forEach(container => {
    const tipOldParent = container.querySelector('.calculator__result-title-block');
    const tipElement = tipOldParent.querySelector('.tip');
    const tipNewParent = container.querySelector('.js-calculator-accordion-content');
    let isOldPosition = true;

    function fix() {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        if (isOldPosition) {
          isOldPosition = false;
          tipNewParent.append(tipElement);
          ScrollTrigger.refresh();
        }
      } else {
        if (!isOldPosition) {
          isOldPosition = true;
          tipOldParent.append(tipElement);
          ScrollTrigger.refresh();
        }
      }
    }

    fix();

    window.addEventListener('resize', fix);
  })
}