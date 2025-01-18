import React, { useEffect } from "react";

let map;
const markers = [];

async function LoadMap() {
	try {
		const response = await fetch("/api/map-data");
		if (!response.ok) throw new Error("Failed to fetch map data");
		// const { apiKey, location, zoom } = await response.json();
		const apiKey = "ENTER API KEY HERE";
		const location = { lat: 37.7749, lng: -122.4194 };
		const zoom = 8;
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
		script.async = true;
		script.defer = true;

		document.head.appendChild(script);

		script.onload = () => {
			initializeMap(location, zoom);
		};

		script.onerror = () => {
			console.error("Failed to load the Google Maps API script");
		};
	} catch (error) {
		console.error("Error loading map:", error);
	}
}

function initializeMap(location, zoom) {
	if (window.google) {
		map = new window.google.maps.Map(document.getElementById("map"), {
			center: location,
			zoom: zoom,
		});
	} else {
		console.error("Google Maps API not available.");
	}
}

function AddPin(lat, lng, title = "New Marker") {
	if (!map) {
		console.error("Map is not initialized yet");
		return;
	}

	const position = { lat, lng };
	const marker = new window.google.maps.Marker({
		position,
		map,
		title,
	});

	markers.push(marker);
	return marker;
}

function ClearMarkers() {
	markers.forEach((marker) => marker.setMap(null));
	markers.length = 0;
}

const Map = () => {
	useEffect(() => {
		LoadMap();
	}, []);

	return (
		<div>
			<h1>Map Example</h1>
			<div id="map" style={{ height: "500px", width: "100%" }}></div>
		</div>
	);
};

export default Map;
