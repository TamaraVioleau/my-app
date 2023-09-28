<script>
	import SpaceNews from '../components/SpaceNews.svelte';
	import Weather from '../components/Weather.svelte';
</script>

<div class="container">
	<Weather />

	<SpaceNews />
</div>

<style lang="scss">
	.container {
		width: 80dvw;
		margin: 0 auto;
	}
</style>
