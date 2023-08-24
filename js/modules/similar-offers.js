const newCardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

export const getNewCard = (offerItem) => {
  const getOfferType = (offerType) => {
    switch (offerType) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'hotel':
        return 'Отель';
    }
  };
  const newCard = newCardTemplate.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = offerItem.offer.title;

  newCard.querySelector('.popup__text--address').textContent =
    offerItem.offer.addres;

  newCard.querySelector(
    '.popup__text--price'
  ).textContent = `${offerItem.offer.price} ₽/ночь`;

  newCard.querySelector('.popup__type').textContent = getOfferType(
    offerItem.offer.type
  );

  newCard.querySelector(
    '.popup__text--capacity'
  ).textContent = `${offerItem.offer.rooms} комнаты для ${offerItem.offer.guests} гостей`;

  newCard.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${offerItem.offer.checkin}, выезд до ${offerItem.offer.checkout}`;

  if (offerItem.offer.features) {
    newCard.querySelectorAll('.popup__feature').forEach((featureListItem) => {
      const isNecessary = offerItem.offer.features.some((feature) =>
        featureListItem.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    newCard
      .querySelectorAll('.popup__feature')
      .forEach((featureListItem) => featureListItem.remove());
  }

  newCard.querySelector('.popup__description').textContent =
    offerItem.offer.description;

  const photoTemplate = newCard.querySelector('.popup__photo');
  if (!offerItem.offer.photos) {
    photoTemplate.remove();
  } else {
    for (let j = 0; j < offerItem.offer.photos.length; j++) {
      if (j === 0) {
        photoTemplate.src = offerItem.offer.photos[j];

        continue;
      }
      const newPhoto = photoTemplate.cloneNode();
      newPhoto.src = offerItem.offer.photos[j];
      newCard.querySelector('.popup__photos').append(newPhoto);
    }
  }

  newCard.querySelector('.popup__avatar').src = offerItem.author.avatar;

  return newCard;
};
