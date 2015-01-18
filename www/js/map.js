  	//initialize the map and set its view to chosen lat and lon anbd zoom level
var map = L.map('map').setView([51.505, -0.09], 12);

//setView returns a map object! We can hence chain methods!

//now add a layer to the map (mapbox street tile layer)
//all the interactions on the map are enabled by default
L.tileLayer('http://{s}.tiles.mapbox.com/v3/av2patel.kmlo778l/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; [...]',
	maxZoom: 18
}).addTo(map);

//leaflet can be used by other providers since it is proovider-agnostic 
//but they recommend Mapbox

//we can add a marker like this:
var marker = L.marker([51.5, -0.09]).addTo(map);


//adding a circle is the same except we need to pass a second argument
//specifying the radius in meters
var circle = L.circle([51.508, -0.11], 500, {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5
}).addTo(map);

//adding a polygon:
var polygon = L.polygon([
	[51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

//creating a popup; bindPopup method attaches a pop up with
//the specified html code when you click on the object
//openPopup method immediately opens the popup
marker.bindPopup("Hello Worldd").openPopup();
circle.bindPopup("This is circle!");
polygon.bindPopup("This is a polygon!");


//this is a standalone popup layer which doesn't need any object
//for it to open. It opens on the map instannce we pass in!
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);


//EVENTS

//will display tool tip when the map instance is clicked
map.on('click',function (e) {
	console.log('Hello');
	popup.setLatLng(e.latlng)
		.setContent("hello, you clicked me at "+ e.latlng+ "!")
		.openOn(map);
});

//GeoJSON has 3 main attributes: type, properties, geometry
console.log(polygon.toGeoJSON());





var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

//using a layer group to combine all the city markers into one layer
var cities = L.layerGroup([littleton, denver, aurora, golden]);
cities.addTo(map);
