<script>
	import { onMount } from 'svelte';
	import { fetchSpaceNews } from '../api/SpaceNews'; // Ajustez le chemin ici

	let spaceNews;
	let timers = {};

	//Fonction de calcul du temps restant
	function calculateTimeLeft(launchDate) {
		const MS_PER_DAY = 24 * 60 * 60 * 1000;
		const MS_PER_HOUR = 60 * 60 * 1000;
		const MS_PER_MINUTE = 60 * 1000;

		let remainingTime = new Date(launchDate) - new Date();

		const days = Math.floor(remainingTime / MS_PER_DAY);
		remainingTime %= MS_PER_DAY;

		const hours = Math.floor(remainingTime / MS_PER_HOUR);
		remainingTime %= MS_PER_HOUR;

		const minutes = Math.floor(remainingTime / MS_PER_MINUTE);
		remainingTime %= MS_PER_MINUTE;

		const seconds = Math.floor(remainingTime / 1000);

		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	//Récupération des articles depuis l'API
	onMount(async () => {
		try {
			spaceNews = await fetchSpaceNews();
		} catch (error) {
			console.error('Failed to fetch space news:', error);
		}

		const interval = setInterval(() => {
			if (spaceNews) {
				spaceNews.forEach((news) => {
					timers[news.id] = calculateTimeLeft(news.net);
				});
				timers = { ...timers };
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	//Formatage de la date
	function formatDate(date) {
		return new Date(date).toLocaleDateString('fr-FR');
	}
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
						<img src={news.image} alt="" />
						<div>
							<h3>{news.name}</h3>
							<p>Status : {news.status.name}</p>
							{#if news.pad && news.pad.location}
								<p>Lieu : {news.pad.location.name}</p>
							{/if}
							<p>Date d'arrivée : {formatDate(news.net)}</p>

							<p>Temps restant : {timers[news.id]}</p>
						</div>
					</li>
				{/each}
			</ul>
		</article>
	{:else}
		<p>Chargement des lancements ...</p>
	{/if}
</section>

<style lang="scss">
	section {
		margin: 2rem auto;
		padding: 3rem;
		@media screen and (min-width: 768px) {
			padding: 5rem;
		}
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		border: 2px solid #efedf6;

		/*From UIGradients*/
		background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
		header {
			@media screen and (min-width: 1024px) {
				display: flex;
			}
			img {
				max-width: 25%;
				max-height: 155px;
				margin-right: 3rem;
				float: left;
				position: relative;
				top: 1rem;
				@media screen and (min-width: 425px) {
					top: 0.5rem;
				}
				@media screen and (min-width: 425px) {
					top: 0;
				}
				@media screen and (min-width: 1024px) {
					margin-right: 5rem;
				}
			}
			p {
				max-width: 600px;
			}
		}
		article {
			margin-top: 4rem;

			ul {
				display: grid;
				grid-template-columns: 1fr;
				gap: 4rem;
				@media screen and (min-width: 1440px) {
					grid-template-columns: 1fr 1fr;
				}

				li {
					display: flex;
					flex-direction: column;
					@media screen and (min-width: 768px) {
						display: grid;
						grid-template-columns: 30% 1fr;
					}
					border-color: 1px solid rgba(219, 234, 254, 1);
					border-radius: 1rem;
					background-color: rgba(255, 255, 255, 1);

					img {
						width: 100%;
						max-height: 200px;
						object-fit: cover;
						object-position: top;
						@media screen and (min-width: 768px) {
							max-height: 100%;
							height: 100%;
						}
					}
					div {
						padding: 2rem;
						@media screen and (min-width: 768px) {
							padding: 4rem;
						}
					}
				}
			}
		}
	}
</style>
