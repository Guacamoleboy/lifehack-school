/* ______________________________________ */

// Variables
/* ______________________________________ */

let pinMode = false;
let eraseMode = false;
let activeButton = null;

const markers = [];
const HIT_RADIUS = 50;
const MIN_DISTANCE = 30;
const pinButton = document.querySelector('#pinButton');
const eraserButton = document.querySelector('#eraserButton');
const STANDARD_MAX_ZOOM = 14; // For V & BL
const SPORT_MAX_ZOOM = 18; // For S & P

/* ______________________________________ */

// Worldmap

/* ______________________________________ */

const map = L.map('map', {
    center: [56.2639, 9.5018], // Denmark Location
    zoom: 4, // Initial Zoom
    minZoom: 3, // Min Zoome
    maxZoom: STANDARD_MAX_ZOOM, // Max Zoom
    maxBounds: [[-90, -180], [90, 180]], // South / North Poles
    maxBoundsViscosity: 1.0 // Can't exit map
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: 'BeyondBorders.dk | Build: 0.0.1 | Release at 1.0.0',
    subdomains: 'abcd',
    maxZoom: 15
}).addTo(map);

/* ______________________________________ */

// Visuals
/* ______________________________________ */

const redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blIcon = L.icon({
    iconUrl: 'assets/images/icons/bucketlist-2-s.png',
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});