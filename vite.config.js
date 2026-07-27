import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		target: 'esnext'
	},
	optimizeDeps: {
		exclude: ['@finos/perspective', '@finos/perspective-viewer']
	}
};

export default config;
