import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import "@finos/perspective";
const Counter_svelte_svelte_type_style_lang = "";
const Perspective_svelte_svelte_type_style_lang = "";
const css = {
  code: "perspective-viewer.svelte-14vzbaa{position:absolute;top:100px;left:100px;right:100px;bottom:100px}",
  map: null
};
const Perspective = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let perspectiveSvelte;
  $$result.css.add(css);
  return `<div><perspective-viewer class="${"svelte-14vzbaa"}"${add_attribute("this", perspectiveSvelte, 0)}></perspective-viewer>
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
