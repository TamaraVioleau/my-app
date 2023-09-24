// src/api/SpaceNews.js
export async function fetchSpaceNews() {
	const API_URL = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/';
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error('Could not fetch space news');
	}
	const data = await response.json();
	return data.results;
}
