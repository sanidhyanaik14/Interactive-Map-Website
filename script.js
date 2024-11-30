
const map = L.map('map').setView([20.5937, 78.9629], 5);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const tajMahal = L.marker([27.1751, 78.0421]).addTo(map);
tajMahal.bindPopup('<b>Taj Mahal</b><br>One of the Seven Wonders of the World.').openPopup();


const delhiCircle = L.circle([28.6139, 77.2090], {
  color: 'blue',
  fillColor: '#30f',
  fillOpacity: 0.5,
  radius: 10000 
}).addTo(map);
delhiCircle.bindPopup('Delhi - Capital of India');


map.on('click', function(e) {
  const { lat, lng } = e.latlng;
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`You clicked at<br>Latitude: ${lat.toFixed(4)}<br>Longitude: ${lng.toFixed(4)}`)
    .openPopup();
});


L.Control.geocoder({
  defaultMarkGeocode: false 
}).on('markgeocode', function(e) {
  const bbox = e.geocode.bbox;
  const poly = L.polygon([
    [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
    [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
    [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
    [bbox.getSouthWest().lat, bbox.getSouthWest().lng]
  ]).addTo(map);

  map.fitBounds(poly.getBounds()); 

 
  L.marker(e.geocode.center).addTo(map)
    .bindPopup(`<b>${e.geocode.name}</b>`)
    .openPopup();
}).addTo(map);
