import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

populateFeedback();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

function onInputData(evt) {
  let data = localStorage.getItem(STORAGE_KEY);
  data = data ? JSON.parse(data) : {};
  let { email, message } = form.elements;
  data = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  data[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function populateFeedback() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
      form.elements[name].value = value ?? '';
    });
  }
}
