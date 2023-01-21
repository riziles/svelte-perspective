import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import "@finos/perspective";
const themes = "";
const Perspective_svelte_svelte_type_style_lang = "";
const css = {
  code: "perspective-viewer.svelte-go93cd{position:absolute;top:100px;left:100px;right:100px;bottom:100px}@media screen and (max-width: 990px){perspective-viewer.svelte-go93cd{top:50px;left:0px;right:0px;bottom:0px}}",
  map: null
};
const Perspective = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let perspectiveSvelte;
  $$result.css.add(css);
  return `<div><perspective-viewer class="${"svelte-go93cd"}"${add_attribute("this", perspectiveSvelte, 0)}></perspective-viewer>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-t32ptj_START -->${$$result.title = `<title>Home</title>`, ""}<meta name="${"description"}" content="${"Svelte demo app"}"><!-- HEAD_svelte-t32ptj_END -->`, ""}

<section>${validate_component(Perspective, "Perspective").$$render($$result, {}, {}, {})}
</section>`;
});
export {
  Page as default
};
