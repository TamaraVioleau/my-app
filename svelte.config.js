import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ typescript: true, scss: true }),
	kit: {
		adapter: adapter()
	}
};

export default config;
