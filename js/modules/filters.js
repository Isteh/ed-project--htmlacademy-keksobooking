const mapFilters = document.querySelector('.map__filters');

const defaultFilter = (item, filter, isNumber = false) => {
  const filterInput = mapFilters.querySelector(`#housing-${filter}`);

  if (isNumber) {
    if (filterInput.value === 'any') {
      return true;
    } else if (+filterInput.value === item) {
      return true;
    }
    return false;
  } else {
    if (filterInput.value === 'any') {
      return true;
    } else if (filterInput.value === item) {
      return true;
    }
    return false;
  }
};

const filterByPrice = (item) => {
  const priceFilter = mapFilters.querySelector('#housing-price');

  switch (priceFilter.value) {
    case 'any':
      return true;
    case 'middle':
      if (item >= 10000 && 50000 >= item) {
        return true;
      }
      return false;
    case 'low':
      if (10000 >= item) {
        return true;
      }
      return false;
    case 'high':
      if (item >= 50000) {
        return true;
      }
      return false;
  }
};

const getRateByFeature = (item) => {
  const itemFeatures = item.offer.features;
  if (itemFeatures) {
    let rate = 0;
    const features = document.querySelectorAll('[id^=filter-]');

    features.forEach((feature) => {
      if (feature.checked) {
        const nameFeature = feature.id.slice(7);

        if (
          Array.from(itemFeatures).some(
            (itemFeature) => itemFeature === nameFeature
          )
        ) {
          rate++;
        } else {
          rate--;
        }
      }
    });
    return rate;
  }
  return 0;
};

const compareByFeature = (offerA, offerB) => {
  const rateA = getRateByFeature(offerA);
  const rateB = getRateByFeature(offerB);

  return rateB - rateA;
};

const filterSimilarOffer = (items) =>
  items
    .filter((item) => defaultFilter(item.offer.type, 'type'))
    .filter((item) => filterByPrice(item.offer.price))
    .filter((item) => defaultFilter(item.offer.rooms, 'rooms', true))
    .filter((item) => defaultFilter(item.offer.guests, 'guests', true))
    .slice()
    .sort(compareByFeature);

const setFiltersClickHandler = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export { filterSimilarOffer, setFiltersClickHandler };
