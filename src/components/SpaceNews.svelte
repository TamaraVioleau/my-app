<script>
	import { onMount } from 'svelte';
	import { fetchSpaceNews } from '../api/SpaceNews'; // Ajustez le chemin ici

	let spaceNews;

	onMount(async () => {
		try {
			spaceNews = await fetchSpaceNews();
		} catch (error) {
			console.error('Failed to fetch space news:', error);
		}
	});
</script>

<section>
	<header>
		<img src="./img/spatial.svg" alt="" />
		<div>
			<h2>Next space missions</h2>
			<p>
				Strap in, space cadets ! Forget about Netflix binges, these upcoming space missions are the
				real must-see cosmic dramas of the year !
			</p>
		</div>
	</header>
	{#if spaceNews}
		<article>
			<ul>
				{#each spaceNews as news}
					<li>
						<p>{news.name}</p>
						<p>Status: {news.status.name}</p>
						{#if news.pad && news.pad.location}
							<p>Lieu: {news.pad.location.name}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</article>
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style lang="scss">
	section {
		width: 80dvw;
		margin: 2rem auto;
		padding: 5rem;
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		border: 2px solid #efedf6;

		/*From UIGradients*/
		background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
		header {
			display: flex;
			img {
				max-width: 25%;
				margin-right: 5rem;
			}
		}
		article {
			margin-top: 4rem;
			ul {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 4rem;

				li {
					border-color: 1px solid rgba(219, 234, 254, 1);
					border-radius: 1rem;
					background-color: rgba(255, 255, 255, 1);
					padding: 4rem;
					max-width: 90%;
				}
			}
		}
	}
</style>
