document.addEventListener('DOMContentLoaded', () => {
  formSubmitHandler();
});

function formSubmitHandler() {
  const forms = Array.from(document.querySelectorAll('.js-handle-form'));
  forms.forEach(form => {
    const url = form.action;
    const submitBtn = form.querySelector('.js-submit-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.classList.add('disabled');

      const formData = new FormData(form);
      
      console.log("АЛГА! МАТУР ФОРМ ДАТАСЫ:", _debugFormData(formData));

      fetch(url, {
        body: formData,
        method: "POST"
      })
        .then(response => {
          const messagesParent = form.closest('.js-form-message-in-content');

          if (response.ok) {
            if (messagesParent) {
              const successMessage = messagesParent.querySelector('.js-form-success');
              const formBlock = messagesParent.querySelector('.js-form-block');

              successMessage.classList.add('opened');
              formBlock.classList.add('hidden');
              form.reset();

              setTimeout(() => {
                successMessage.classList.remove('opened');
                formBlock.classList.remove('hidden');
              }, 5000);
            } else {
              window.modalApi.open('#success');
              form.reset();
            }
          } else {
            if (messagesParent) {
              const errorMessage = messagesParent.querySelector('.js-form-error');
              const formBlock = messagesParent.querySelector('.js-form-block');

              errorMessage.classList.add('opened');
              formBlock.classList.add('hidden');

              setTimeout(() => {
                errorMessage.classList.remove('opened');
                formBlock.classList.remove('hidden');
              }, 10000);
            } else {
              window.modalApi.open('#error');
            }
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          submitBtn.classList.remove('disabled');
        })
    })
  })
}

function _debugFormData(formData) {
  let object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  return json = JSON.stringify(object);
}

const pristineConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'js-validator-wrapper',
  errorClass: 'invalid',
  successClass: 'valid',
  // class of the parent element where error text element is appended
  errorTextParent: 'js-validator-wrapper',
  // type of element to create for the error text
  errorTextTag: 'span',
  // class of the error text element
  errorTextClass: 'form__input-error' 
}