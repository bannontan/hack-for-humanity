import request from "request";

// const geocodeLocation = async (address) => {
//     const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Use API key from environment variables
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     return new Promise((resolve, reject) => {
//         request(url, { json: true }, (error, response, body) => {
//             if (error) {
//                 console.error("Error fetching geocoding data:", error.message);
//                 reject("Failed to geocode location");
//             } else if (body.status !== "OK") {
//                 console.error("Geocoding failed:", body.status);
//                 reject(`Geocoding failed with status: ${body.status}`);
//             } else {
//                 const { lat, lng } = body.results[0].geometry.location; // Corrected 'long' to 'lng'
//                 resolve({ lat, lng }); // Return only lat and lng
//             }
//         });
//     });
// };

const geocodeLocation = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    return new Promise((resolve, reject) => {
        request(url, { json: true }, (error, response, body) => {
            if (error) {
                console.error("Error fetching geocoding data:", error.message);
                reject(new Error("Failed to geocode location due to network error."));
            } else if (body.status === "ZERO_RESULTS") {
                reject(new Error(`No results found for the address: "${address}".`));
            } else if (body.status !== "OK") {
                reject(new Error(`Geocoding failed with status: ${body.status}`));
            } else {
                const { lat, lng } = body.results[0].geometry.location;
                resolve({ lat, lng });
            }
        });
    });
};


export default geocodeLocation;
