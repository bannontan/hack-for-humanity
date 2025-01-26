import React, { useEffect } from "react";
import dotenv from "dotenv";

dotenv.config();

let map;
const markers = [];

async function LoadMap(role) {
	try {
		console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
		const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
		const location = { lat: 37.7749, lng: -122.4194 }; // Should change to current location
		const zoom = 8;
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
		script.async = true;
		script.defer = true;

		document.head.appendChild(script);

		script.onload = () => {
			if (role === "admin") {
				initializeAdminMap(location, zoom);
				console.log("Admin map loaded");
			} else {
			initializeUserMap(location, zoom);
			console.log("User map loaded");
			}
		};

		script.onerror = () => {
			console.error("Failed to load the Google Maps API script");
		};
	} catch (error) {
		console.error("Error loading map:", error);
	}
}

async function initializeUserMap(location, zoom) {
    if (window.google) {
        map = new window.google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: zoom,
        });

        try {
            // Define the API endpoints
            const endpoints = [
                { url: 'http://localhost:8080/adminpost', labelKey: 'helpType' },
                { url: 'http://localhost:8080/disaster', labelKey: 'name' }
            ];

            // Fetch all locations in parallel
            const fetchPromises = endpoints.map(endpoint =>
                fetch(endpoint.url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch from ${endpoint.url}: ${response.statusText}`);
                    }
                    return response.json();
                }).then(data => ({ data, labelKey: endpoint.labelKey }))
            );

            // Await all fetch requests
            const results = await Promise.all(fetchPromises);

            // Process and add pins for each dataset
            results.forEach(result => {
                result.data.forEach(post => {
                    if (post.lat && post.lng) {
                        AddPin(post.lat, post.lng, post[result.labelKey] || "Existing Marker");
                    }
                });
            });

            console.log("All locations have been added to the map.");

        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    } else {
        console.error("Google Maps API not available.");
    }
}

async function initializeAdminMap(location, zoom) {
    if (window.google) {
        map = new window.google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: zoom,
        });

        try {
            // Define the API endpoints
            const endpoints = [
                { url: 'http://localhost:8080/adminpost', labelKey: 'helpType' },
                { url: 'http://localhost:8080/disaster', labelKey: 'name' },
				{ url: 'http://localhost:8080/map/loc/admin', labelKey: 'type' },
            ];

            // Fetch all locations in parallel
            const fetchPromises = endpoints.map(endpoint =>
                fetch(endpoint.url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch from ${endpoint.url}: ${response.statusText}`);
                    }
                    return response.json();
                }).then(data => ({ data, labelKey: endpoint.labelKey }))
            );

            // Await all fetch requests
            const results = await Promise.all(fetchPromises);

            // Process and add pins for each dataset
            results.forEach(result => {
                result.data.forEach(post => {
                    if (post.lat && post.lng) {
                        AddPin(post.lat, post.lng, post[result.labelKey] || "Existing Marker");
                    }
                });
            });

            console.log("All locations have been added to the map.");

        } catch (error) {
            console.error("Error fetching locations:", error);
        }
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

const Map = ({ role }) => {
	useEffect(() => {
		LoadMap(role);
	}, []);

	return (
		<div id="map" style={{ height: "100%", width: "100%" }}></div>
	);
};

export default Map;
