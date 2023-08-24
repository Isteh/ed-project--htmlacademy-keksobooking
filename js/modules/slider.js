import {adFormPristine} from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  connect: 'lower',
  step: 100,
  format: {
    to: (value) => parseInt(value, 10),
    from: (value) => parseInt(value, 10),
  },
});

sliderElement.noUiSlider.on('update', (sliderValue) => {
  priceInput.value = sliderValue;
  adFormPristine.validate(priceInput);
});

priceInput.addEventListener('change', ()=>{
  sliderElement.noUiSlider.set(priceInput.value);
});

