let map;
const markers = [];

async function loadMap() {
    try {
        const response = await fetch('/api/map-data');
        if (!response.ok) throw new Error('Failed to fetch map data');
        const { apiKey, location, zoom } = await response.json();

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            map = new google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: zoom,
            });
        };

        script.onerror = () => {
            console.error('Failed to load the Google Maps API script');
        };

        document.head.appendChild(script);
    } catch (error) {
        console.error('Error loading map:', error);
    }
}

function addPin(lat, lng, title = 'New Marker') {
    if (!map) {
        console.error('Map is not initialized yet');
        return;
    }

    const position = { lat, lng };
    const marker = new google.maps.Marker({
        position,
        map,
        title,
    });

    markers.push(marker);
    return marker;
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers.length = 0;
}

loadMap();

// Example: Add pins dynamically
setTimeout(() => {
    addPin(-34.397, 150.644, 'First Marker');
    addPin(-35.0, 151.0, 'Second Marker');
}, 2000);
