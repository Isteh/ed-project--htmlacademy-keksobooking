/* eslint-disable arrow-body-style */

const RANDOM_TITLES = [
  'GASDOM',
  'AUEDOM',
  'COCALITRAXALI',
  'BROTMNENOGIIAUBOGI',
];

const RANDOM_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const RANDOM_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const RANDOM_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const RANDOM_DESC = [
  'Gooooooood',
  'Nooooooorm',
  'Baaaaaaaad',
];

const RANDOM_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomPositiveNumber = (rangeFrom = 0, rangeTo = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(rangeFrom), Math.abs(rangeTo)));
  const upper = Math.floor(Math.max(Math.abs(rangeFrom), Math.abs(rangeTo)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomFloatNumber = (rangeFrom = 0, rangeTo = 1, numberOfSigns = 0) => {
  const lower = Math.min(Math.abs(rangeFrom), Math.abs(rangeTo));
  const upper = Math.max(Math.abs(rangeFrom), Math.abs(rangeTo));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(numberOfSigns);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveNumber(0, elements.length - 1)];
};

const createOffers = (index) =>{
  const lat = getRandomFloatNumber(35.65000,35.70000,5);
  const lng = getRandomFloatNumber(139.70000,139.80000,5);

  index++;
  if ((index) / 10 < 1){
    index = `0${index}`;}
  else {
    index = `${index}`;}

  return {
    author: {
      avatar: `img/avatars/user${index}.png`,
    },
    location:{
      lat: lat,
      lng: lng,
    },
    offer:{
      title: getRandomArrayElement(RANDOM_TITLES),
      addres: `${lat}, ${lng}`,
      price: getRandomPositiveNumber(0,100000),
      type: getRandomArrayElement(RANDOM_TYPES),
      rooms: getRandomPositiveNumber(1,10),
      guests: getRandomPositiveNumber(1,10),
      checkin:getRandomArrayElement(RANDOM_TIME),
      checkout: getRandomArrayElement(RANDOM_TIME),
      features: Array.from({
        length: getRandomPositiveNumber(0,6)},
      (v, k) => {return RANDOM_FEATURES[k];}
      ),
      description: getRandomArrayElement(RANDOM_DESC),
      photos:
        Array.from({
          length: getRandomPositiveNumber(0,3)},
        () => {
          return getRandomArrayElement(RANDOM_PHOTOS);
        }
        ),
    },
  };
};

export const getRandomSimilarOffers = (similarOffersCount) => {
  return Array.from({length: similarOffersCount}, (v,k) => createOffers(k));
};
