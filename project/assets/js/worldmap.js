/* ______________________________________ */ 

                // Worldmap
/* ______________________________________ */ 

const map = L.map('map', {
    center: [56.2639, 9.5018], // Denmark Location
    zoom: 5, // Initial zoom on spawn
    minZoom: 3, // Just enough to not mess with edge
    maxZoom: 10 // To avoid people zooming all the way in. No need to do such a thing!!
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 10 // Same as first maxZoom
}).addTo(map);

/* ______________________________________ */ 

              // Variables       
/* ______________________________________ */

let pinMode = false;
let eraseMode = false;
let activeButton = null;

const markers = [];
const HIT_RADIUS = 50;
const MIN_DISTANCE = 30;
const pinButton = document.querySelector('.guac-navbar-bottom-right img[src$="pin-1.png"]');
const eraserButton = document.querySelector('.guac-navbar-bottom-right img[src$="erase.png"]');

/* ______________________________________ */ 

            // Event Listeners      
/* ______________________________________ */

pinButton.addEventListener('click', () => setActive(pinButton, 'pin'));
eraserButton.addEventListener('click', () => setActive(eraserButton, 'erase'));

/* ______________________________________ */ 

           // Button handle       
/* ______________________________________ */

function setActive(button, mode) {
    
    if (activeButton && activeButton !== button) {
        activeButton.classList.remove('active');
    }

    if (activeButton === button) {
        button.classList.remove('active');
        activeButton = null;
        pinMode = false;
        eraseMode = false;
    } else {
        button.classList.add('active');
        activeButton = button;
        pinMode = mode === 'pin';
        eraseMode = mode === 'erase';
    }
}

/* ______________________________________ */ 

         // Load Markers (for now)      
/* ______________________________________ */

function loadMarkers() {
    const saved = localStorage.getItem('markers');
    if (!saved) return;

    const savedMarkers = JSON.parse(saved);
    savedMarkers.forEach(pos => {
        const marker = L.marker([pos.lat, pos.lng]).addTo(map);
        markers.push(marker);
    });
}

/* ______________________________________ */ 

         // Save Markers (for now)      
/* ______________________________________ */ 

function saveMarkers() {
    const data = markers.map(marker => {
        const latlng = marker.getLatLng();
        return { lat: latlng.lat, lng: latlng.lng };
    });
    localStorage.setItem('markers', JSON.stringify(data));
}

/* ______________________________________ */ 

                // Clicking      
/* ______________________________________ */ 

map.on('click', function(e) {
    const clickLatLng = e.latlng;

    if (pinMode) {
        let tooClose = markers.some(marker => {
            const distance = map.latLngToContainerPoint(marker.getLatLng())
                               .distanceTo(map.latLngToContainerPoint(clickLatLng));
            return distance < MIN_DISTANCE;
        });

        if (tooClose) {
            alert('Pins are too close. Zoom in to get more accurate..');
            return;
        }

        // Add marker if left is being clicked
        const marker = L.marker(clickLatLng).addTo(map);
        markers.push(marker);

        // LocalStorage (for now)
        saveMarkers();

    } else if (eraseMode) {
        for (let i = markers.length - 1; i >= 0; i--) {
            const marker = markers[i];
            const distance = map.latLngToContainerPoint(marker.getLatLng())
                               .distanceTo(map.latLngToContainerPoint(clickLatLng));

            if (distance <= HIT_RADIUS) {
                map.removeLayer(marker);
                markers.splice(i, 1);
                saveMarkers(); // LocalStorage (for now)
            }
        }
    }
});

// LocalStorage Run (For now)
loadMarkers();