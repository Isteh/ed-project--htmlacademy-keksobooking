import { switchToActive, switchToInactive } from './utils.js';
import { getNewCard } from './similar-offers.js';

switchToInactive();

const START_POINT = { lat: 35.68316, lng: 139.75572, zoom: 13 };
const { lat, lng, zoom } = START_POINT;

const map = L.map('map-canvas')
  .on('load', () => {
    switchToActive();
  })
  .setView({ lat, lng }, zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// main marker and his interaction with form

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker({ lat, lng }, { icon: mainIcon, draggable: true });
mainMarker.addTo(map);

const addressInput = document.querySelector('#address');

mainMarker.on('moveend', (evt) => {
  const targetLatLng = evt.target.getLatLng();
  addressInput.value = `${targetLatLng.lat.toFixed(5)},
${targetLatLng.lng.toFixed(5)}`;
});

const setToStartPosition = () => {
  map.setView({ lat, lng }, zoom, { animate: true, noMoveStart: true });
  mainMarker.setLatLng({ lat, lng });
  addressInput.value = `${lat},${lng}`;
  map.closePopup();
};

setToStartPosition();

// simillar offers

const similarIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const similarMarkersGroup = L.layerGroup().addTo(map);

const createSimilarMarkers = (similarItems) => {
  similarMarkersGroup.clearLayers();

  similarItems.slice(0, 10).forEach((similarItem) => {
    const marker = L.marker(
      {
        lat: similarItem.location.lat,
        lng: similarItem.location.lng,
      },
      {
        icon: similarIcon,
      }
    );

    marker.addTo(similarMarkersGroup).bindPopup(getNewCard(similarItem));
  });
};

export { setToStartPosition, createSimilarMarkers };
