<script>
	import { onMount } from 'svelte';
	import { fetchLocationData, fetchWeatherData } from '../api/weather';

	let weatherData;
	let locationName;
	let currentTime;

	function updateCurrentTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString();
	}

	onMount(() => {
		updateCurrentTime();
		setInterval(updateCurrentTime, 1000);

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

<header>
	<div>
		<h1>Welcome to Dashboard!</h1>
		<div>
			{#if weatherData && locationName}
				<p>
					{locationName}: {weatherData.WeatherText}, Temperature: {weatherData.Temperature.Metric
						.Value}°C
				</p>
			{:else}
				<p>Loading...</p>
			{/if}
			<p>Heure locale : {currentTime}</p>
		</div>
		<img src="./img/woman_weather.png" alt="" />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		width: 80dvw;
		margin: 2rem auto;
		padding: 5rem;

		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid #efedf6;

		/*From UIGradients*/
		background: #e0eafc; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#cfdef3,
			#e0eafc
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#cfdef3,
			#e0eafc
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		img {
			position: absolute;
			top: 0;
			max-height: 100%;
			right: 0;
			margin-right: 5rem;
		}
	}
</style>
