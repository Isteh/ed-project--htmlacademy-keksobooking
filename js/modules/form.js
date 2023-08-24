import { sendData } from './api.js';
import { clearCurrentFilters } from './filters.js';
import { setToStartPosition } from './map.js';
import { clearPreviewImgs, setFileChooserHandler } from './preshow-imgs.js';
import { showFormErrorMessage, showFormSuccessMessage } from './utils.js';

const adForm = document.querySelector('.ad-form');

// Set prewiew img file
const avatarFileChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

setFileChooserHandler(avatarFileChooser, avatarPreview, (preview, file) => {
  preview.src = URL.createObjectURL(file);
});

const offerFileChooser = adForm.querySelector('#images');
const offerPreview = adForm.querySelector('.ad-form__photo');

setFileChooserHandler(
  offerFileChooser,
  offerPreview,
  (preview, file) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  },
  true
);

// Validate

const adFormPristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

// Validate type/price >>

const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');
const housingTypes = {
  bungalow: { price: '0', nameForMessage: 'бунгало' },
  flat: { price: '1000', nameForMessage: 'квартиры' },
  hotel: { price: '3000', nameForMessage: 'отеля' },
  house: { price: '5000', nameForMessage: 'дома' },
  palace: { price: '10000', nameForMessage: 'дворца' },
};

const getMinPriceErrorMessage = () =>
  `Для ${housingTypes[typeInput.value].nameForMessage} минимум ${
    housingTypes[typeInput.value].price
  }`;

const validatePrice = () =>
  +housingTypes[typeInput.value].price <= +priceInput.value;

adFormPristine.addValidator(priceInput, validatePrice, getMinPriceErrorMessage);

typeInput.addEventListener('change', () => {
  priceInput.placeholder = housingTypes[typeInput.value].price;
  adFormPristine.validate(priceInput);
});

// Validate room number/capacity >>

const capacity = adForm.querySelector('#capacity');
const roomNumber = adForm.querySelector('#room_number');

const getCapacityErrorMessage = () => {
  if (roomNumber.value === '100') {
    return 'Такое количество комнат не для гостей';
  }
  if (capacity.value === '0') {
    return 'Должно быть хотя бы одно место';
  }
  return 'Гостей не может быть больше чем комнат';
};

const validateCapacity = () =>
  (capacity.value <= roomNumber.value &&
    roomNumber.value !== '100' &&
    capacity.value !== '0') ||
  (roomNumber.value === '100' && capacity.value === '0');

adFormPristine.addValidator(
  capacity,
  validateCapacity,
  getCapacityErrorMessage
);

roomNumber.addEventListener('change', () => {
  adFormPristine.validate(capacity);
});

// Validate room timein/timeout >>

const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const validateTime = () => timein.value === timeout.value;
const getTimeErrorMessage = () => 'Время заезда/выезда должно быть одинаковым';

adFormPristine.addValidator(timeout, validateTime, getTimeErrorMessage);

adForm
  .querySelector('.ad-form__element--time')
  .addEventListener('change', (evt) => {
    evt.target.id === 'timein'
      ? (timeout.value = timein.value)
      : (timein.value = timeout.value);
    adFormPristine.validate(timeout);
  });

const resetForm = () => {
  adForm.reset();
  setToStartPosition();
  clearCurrentFilters();
  adFormPristine.reset();
  clearPreviewImgs(avatarPreview);
  clearPreviewImgs(offerPreview);
};

const setFormControlHandler = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submit = adForm.querySelector('.ad-form__submit');

    const isValid = adFormPristine.validate();
    if (isValid) {
      submit.disabled = true;
      sendData(
        () => {
          submit.disabled = false;
          resetForm();
          cb();
          showFormSuccessMessage();
        },
        () => {
          submit.disabled = false;
          showFormErrorMessage();
        },
        new FormData(evt.target)
      );
    }
  });

  adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    cb();
  });
};

export { adFormPristine, setFormControlHandler };
