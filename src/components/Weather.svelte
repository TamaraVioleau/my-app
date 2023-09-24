<script>
	import { onMount } from 'svelte';
	import { fetchLocationData, fetchWeatherData } from '../api/weather';

	let weatherData;
	let locationName;

	onMount(async () => {
		try {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { latitude, longitude } = position.coords;
				const locationData = await fetchLocationData(latitude, longitude);
				locationName = locationData.LocalizedName;
				const locationKey = locationData.Key;

				weatherData = await fetchWeatherData(locationKey);
			});
		} catch (error) {
			console.error('Failed to fetch weather:', error);
		}
	});
</script>

<div>
	{#if weatherData && locationName}
		<p>
			{locationName}: {weatherData.WeatherText}, Temperature: {weatherData.Temperature.Metric
				.Value}°C
		</p>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
