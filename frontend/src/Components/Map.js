import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import { renderToStaticMarkup } from 'react-dom/server';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock, FaFire } from 'react-icons/fa';
import { GiEarthCrack } from 'react-icons/gi'; // Earthquake
import { WiFlood } from 'react-icons/wi';    // Flooding

dotenv.config();

let map;
const markers = [];

async function LoadMap(role, setData) {
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
				initializeAdminMap(location, zoom, setData);
				console.log("Admin map loaded");
			} else {
				initializeUserMap(location, zoom, setData);
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

function createIcon(iconComponent) {
	// Render the React component to a static SVG string
	const svgString = renderToStaticMarkup(iconComponent);
  
	// Convert the SVG string into a data URL
	const svgBase64 = btoa(svgString); // Encode the SVG to base64
	return `data:image/svg+xml;base64,${svgBase64}`;
  }
  
const urlMapping = {
	'First Aid': createIcon(<FaAmbulance size={40} color="blue" />),
	'Water/Food': createIcon(<FaUtensils size={40} color="green" />),
	'Psychological Support': createIcon(<FaUserMd size={40} color="purple" />),
	'Waiting Time': createIcon(<FaClock size={40} color="orange" />),
	'Flooding': createIcon(<WiFlood size={40} color="blue" />),
	'Earthquake': createIcon(<GiEarthCrack size={40} color="brown" />),
	'Fire': createIcon(<FaFire size={40} color="red" />),
};

function renderIcon(data) {
	const iconUrl = urlMapping[data];
	if (iconUrl) {
	  return iconUrl;
	}
}
	
async function fetchData(endpoints, setData) {
	try {
	  const fetchPromises = endpoints.map(endpoint =>
		fetch(endpoint.url, {
		  method: 'GET',
		  headers: { 'Content-Type': 'application/json' },
		})
		  .then(response => {
			if (!response.ok) {
			  throw new Error(`Failed to fetch from ${endpoint.url}: ${response.statusText}`);
			}
			return response.json();
		  })
		  .then(data => {
			// Add labelKey and handle specific logic for the 'disaster' endpoint
			if (endpoint.labelKey === 'name') {
			  return data.map(item => ({
				...item,
				labelKey: endpoint.labelKey,
				event: item.event || 'Unknown Event', // Add 'event' column with a fallback value
			  }));
			}
			return data.map(item => ({ ...item, labelKey: endpoint.labelKey }));
		  })
	  );
  
	  const results = await Promise.all(fetchPromises);
	  const mergedData = results.flat();
	  setData(mergedData);
  
	  // Add pins to map initially
	  mergedData.forEach(item => {
		if (item.lat && item.lng) {
		  AddPin(item.lat, item.lng, item, item[item.labelKey] || "Existing Marker");
		}
	  });
  
	  console.log("All locations have been added to the map.");
	} catch (error) {
	  console.error("Error fetching locations:", error);
	}
  }
  

async function initializeUserMap(location, zoom, setData) {
	if (window.google) {
		map = new window.google.maps.Map(document.getElementById("map"), {
			center: location,
			zoom: zoom,
		});

		const endpoints = [
			{ url: 'http://localhost:8080/adminpost', labelKey: 'helpType' },
			{ url: 'http://localhost:8080/disaster', labelKey: 'name' }
		];

		fetchData(endpoints, setData);
	} else {
		console.error("Google Maps API not available.");
	}
}

async function initializeAdminMap(location, zoom, setData) {
	if (window.google) {
		map = new window.google.maps.Map(document.getElementById("map"), {
			center: location,
			zoom: zoom,
		});

		const endpoints = [
			{ url: 'http://localhost:8080/adminpost', labelKey: 'helpType' },
			{ url: 'http://localhost:8080/disaster', labelKey: 'name' },
			{ url: 'http://localhost:8080/map/loc/admin', labelKey: 'type' },
		];

		fetchData(endpoints, setData);
	} else {
		console.error("Google Maps API not available.");
	}
}

function AddPin(lat, lng, item, title = "New Marker") {
	if (!map) {
		console.error("Map is not initialized yet");
		return;
	}
	const iconKey = item.helpType || item.event || item.type;
	const iconUrl = renderIcon(iconKey);

	const position = { lat, lng };
	const marker = new window.google.maps.Marker({
		position,
		map,
		title,
		icon: {
			url: iconUrl, // Use the generated icon
		},
	});

	markers.push(marker);
	return marker;
}

function ClearMarkers() {
	markers.forEach((marker) => marker.setMap(null));
	markers.length = 0;
}

const Map = ({ role }) => {
	const [data, setData] = useState([]);
	const [selectedLabelKey, setSelectedLabelKey] = useState("");
	const [selectedFilterValue, setSelectedFilterValue] = useState("");

	useEffect(() => {
		LoadMap(role, setData);
	}, [role]);

	const handleLabelChange = (e) => {
		setSelectedLabelKey(e.target.value);
		setSelectedFilterValue("");  // Reset filter value when label changes
		updateMarkers(e.target.value, "");
	};

	const handleFilterValueChange = (e) => {
		setSelectedFilterValue(e.target.value);
		updateMarkers(selectedLabelKey, e.target.value);
	};

	const updateMarkers = (labelKey, filterValue) => {
		ClearMarkers();
		data
			.filter(item => 
				(labelKey === "" || item.labelKey === labelKey) &&
				(filterValue === "" || item[getFilterField(labelKey)] === filterValue)
			)
			.forEach(item => {
				if (item.lat && item.lng) {
					AddPin(item.lat, item.lng, `${item[getFilterField(labelKey)]}`);
				}
			});
	};

	const getFilterField = (labelKey) => {
		const mapping = {
			"helpType": "helpType",
			"name": "event",
			"type": "type"
		};
		return mapping[labelKey] || "";
	};

	const getUniqueValues = (labelKey) => {
		const field = getFilterField(labelKey);
		return [...new Set(data.filter(item => item.labelKey === labelKey).map(item => item[field]))];
	};

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<div style={{ marginBottom: "10px" }}>
				<label>Select Filter Category:</label>
				<select onChange={handleLabelChange}>
					<option value="">All</option>
					<option value="helpType">Admin Help Type</option>
					<option value="name">Disaster Name</option>
					<option value="type">User Help Requests</option>
				</select>

				{selectedLabelKey && (
					<>
						<label style={{ marginLeft: "20px" }}>Filter by type:</label>
						<select onChange={handleFilterValueChange}>
							<option value="">All</option>
							{getUniqueValues(selectedLabelKey).map((value, index) => (
								<option key={index} value={value}>{value}</option>
							))}
						</select>
					</>
				)}
			</div>
			<div id="map" style={{ height: "90%", width: "100%" }}></div>
		</div>
	);
};

export default Map;
