const showMessage = (message, isError = false) => {
  const errorMessage = document.createElement('div');
  errorMessage.id = errorMessage;
  errorMessage.style.zIndex = 100;
  errorMessage.style.position = 'sticky';
  errorMessage.style.width = '100%';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.minHeight = '25px';
  errorMessage.style.backgroundColor = '#0378FF';
  errorMessage.style.color = 'white';
  errorMessage.style.bottom = '0';
  errorMessage.textContent = message;

  if (isError) {
    errorMessage.style.backgroundColor = 'tomato';
  }

  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 4000);
};

const succesMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const showFormSuccessMessage = () => {
  const message = succesMessageTemplate.cloneNode(true);
  document.body.append(message);

  const onSuccessMessageKeydown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
    message.removeEventListener('click', onSuccessMessageClick);
  };

  const onSuccessMessageClick = () => {
    message.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
  };

  message.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageKeydown);
};

const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const showFormErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.append(message);

  const messageButton = message.querySelector('.error__button');

  const onErrorMessageKeydown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
    messageButton.removeEventListener('click', onErrorMessageClick);
  };

  const onErrorMessageClick = () => {
    message.remove();
    document.removeEventListener('keydown', onErrorMessageKeydown);
  };

  messageButton.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const switchToInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  Array.from(adForm.querySelectorAll('fieldset')).map((field) => {
    field.disabled = true;
  });
  Array.from(mapFilters.querySelectorAll('fieldset')).map((field) => {
    field.disabled = true;
  });
};

const switchToActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  Array.from(adForm.querySelectorAll('fieldset')).map((field) => {
    field.disabled = false;
  });
  Array.from(mapFilters.querySelectorAll('fieldset')).map((field) => {
    field.disabled = false;
  });
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {
  showMessage,
  showFormSuccessMessage,
  showFormErrorMessage,
  switchToInactive,
  switchToActive,
  debounce,
  throttle
};
