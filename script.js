// this is from the API: https://docs.mapbox.com/mapbox-gl-js/guides/install/
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmFub3RhcnQiLCJhIjoiY2w2Z3Vld2J2MnFjZTNkcXM2bmxkcjRnNCJ9.SYvcLi4HByBw791VSeVbmA';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// API call geolocation to get current position
navigator.geolocation.getCurrentPosition(successLocation, 
    errorLocation, { 
    enableHighAccuracy: true
})

function setupMap(centerPosition) {
    //create a new map
    const map = new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: centerPosition,
        zoom: 15,
        projection: 'globe'
    });
    map.on('style.load', () => {
        map.setFog({})
    });

    // adding navigation control to our map
    const nav = new mapboxgl.NavigationControl({
        visualizePitch: true
    });
    map.addControl(nav, 'bottom-right');

    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),'top-left');
}

// Function for a successful location
function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

// Function for a nonexistant location
function errorLocation() {
    setupMap([-2.24, 53.48])
}

