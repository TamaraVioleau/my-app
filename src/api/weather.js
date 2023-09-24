export async function fetchLocationData(lat, lon) {
	const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;
	const API_URL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

	const params = new URLSearchParams({
		apikey: API_KEY,
		q: `${lat},${lon}`
	});

	const url = `${API_URL}?${params.toString()}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Could not fetch location data');
	}

	const data = await response.json();
	return data;
}

export async function fetchWeatherData(locationKey) {
	const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;
	const API_URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;

	const params = new URLSearchParams({
		apikey: API_KEY
	});

	const url = `${API_URL}?${params.toString()}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Could not fetch weather data');
	}

	const data = await response.json();
	return data[0]; // Généralement, les données météorologiques sont dans un tableau, nous prenons le premier élément.
}
