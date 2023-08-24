import './modules/slider.js';
import { getData } from './modules/api.js';
import { createSimilarMarkers } from './modules/map.js';
import './modules/filters.js';
import {
  filterSimilarOffer,
  setFiltersClickHandler,
} from './modules/filters.js';
import { debounce } from './modules/utils.js';
import { setFormControlHandler } from './modules/form.js';

getData((data) => {
  createSimilarMarkers(filterSimilarOffer(data));
  setFiltersClickHandler(
    debounce(() => createSimilarMarkers(filterSimilarOffer(data)))
  );
  setFormControlHandler(() => createSimilarMarkers(filterSimilarOffer(data)));
});
