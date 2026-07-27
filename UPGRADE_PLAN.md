# Upgrade Plan: svelte-perspective

## Current → Target Versions

| Package | Current | Target |
|---|---|---|
| svelte | 3.54.0 | 5.56.8 |
| @sveltejs/kit | 1.0.0 | 2.70.1 |
| @sveltejs/adapter-netlify | 1.0.0-next.88 | 6.0.4 |
| @finos/perspective | 1.9.2 | 3.8.0 |
| @finos/perspective-viewer | 1.9.2 | 3.8.0 |
| @finos/perspective-viewer-d3fc | 1.9.2 | 3.8.0 |
| @finos/perspective-viewer-datagrid | 1.9.2 | 3.8.0 |
| eslint | 8.28.0 | 9.x (flat config) |
| prettier | 2.8.0 | 3.x |
| vite | 4.0.0 | 6.x (via SvelteKit) |
| @fontsource/fira-mono | 4.5.10 | latest |
| @neoconfetti/svelte | 1.0.0 | latest |

## Phase 1: PR & Repo Cleanup

- [x] Close PR #1 (openlayers plugin) — plugin API changed in Perspective v3+, equivalent lives in `@perspective-dev/viewer-openlayers` or `viewer-charts`
- [ ] Gitignore `.netlify/` (build output, shouldn't be tracked)
- [ ] Delete `.netlify/` directory from tracking
- [ ] Remove unused adapters: `@sveltejs/adapter-auto`, `@sveltejs/adapter-static`, `@sveltejs/adapter-vercel`

## Phase 2: Dependency Updates

- [ ] Update all packages to latest via npm
- [ ] Update `package.json` scripts (remove deprecated `--plugin-search-dir`)
- [ ] Delete `package-lock.json` and regenerate

## Phase 3: Config Migration

- [ ] ESLint: `.eslintrc.cjs` → `eslint.config.js` (flat config, ESLint 9 required format)
- [ ] Prettier: remove `.prettierrc` (infer from editor defaults), or keep minimal
- [ ] `svelte.config.js`: adapter netlify v6 uses ESM, may need updated config shape
- [ ] `.prettierignore` / `.eslintignore` → if ESLint flat config, ignores are handled differently

## Phase 4: SvelteKit 2 Migration

Key breaking changes to address:
- [ ] `$app/stores` → `$app/state` (page store becomes rune-based)
- [ ] `$app/environment` `dev` → `dev` still exists but check API
- [ ] Adapter APIs changed (netlify v6 uses modern Functions v2 format)
- [ ] `cookies` API renamed: `set` → `set` (check signature changes)
- [ ] `@sveltejs/kit/hooks` → check for any changes

## Phase 5: Svelte 5 Runes Migration

- [ ] `onMount` → `$effect` or `{@attach ...}` for external library integration
- [ ] `$page.url.pathname` → `page.url.pathname` (rune from `$app/state`)
- [ ] `export let` → `$props()`
- [ ] `on:click` → `onclick`
- [ ] `<slot>` → `{@render children()}` with `{#snippet}` if needed
- [ ] `aria-current={...}` → Svelte 5 attribute syntax (should still work)
- [ ] Convert `Perspective.svelte` Perspective integration: may need `$effect` for viewer init
- [ ] `bind:this` → still works in Svelte 5 but ensure it's compatible

## Phase 6: Build & Test

- [ ] Run `npm run build` and fix any errors
- [ ] Test dev server (`npm run dev`)
- [ ] Verify Perspective viewer loads and displays data
- [ ] Verify Netlify adapter output

## Notes

- **openlayers PR**: The PR adds `@finos/perspective-viewer-openlayers` which was deprecated when Perspective moved to v3. The map scatter functionality is now available via `@perspective-dev/viewer-openlayers` or the new `viewer-charts` plugin. We'll close the PR and can add the modern equivalent later if needed.
- **Perspective 1.9 → 3.8**: Major API changes. Need to check import paths, theme CSS path, worker API, and plugin registration.
- **Svelte 3 → 5**: Largest migration scope. Svelte 5 is backward-compatible with Svelte 4 syntax but we should fully adopt runes.
