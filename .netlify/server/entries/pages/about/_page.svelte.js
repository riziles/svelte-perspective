import { c as create_ssr_component } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1ds1qyu_START -->${$$result.title = `<title>About</title>`, ""}<meta name="${"description"}" content="${"About this app"}"><!-- HEAD_svelte-1ds1qyu_END -->`, ""}

<div class="${"text-column"}"><h1>About this app</h1>

	<p>This is a <a href="${"https://kit.svelte.dev"}">SvelteKit</a> app with a <a href="${"https://perspective.finos.org"}">Perspective</a> plugin. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre></div>`;
});
export {
  Page as default
};
