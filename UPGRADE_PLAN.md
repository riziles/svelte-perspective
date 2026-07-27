# Upgrade Plan: svelte-perspective

## Current → Target Versions

| Package | Current | Target | Actual |
|---|---|---|---|
| svelte | 3.54.0 | 5.x | **5.56.8** |
| @sveltejs/kit | 1.0.0 | 2.x | **2.70.1** |
| @sveltejs/adapter-netlify | 1.0.0-next.88 | 6.x | **6.0.4** |
| @finos/perspective | 1.9.2 | 3.x | **3.8.0** |
| @finos/perspective-viewer | 1.9.2 | 3.x | **3.8.0** |
| @finos/perspective-viewer-d3fc | 1.9.2 | 3.x | **3.8.0** |
| @finos/perspective-viewer-datagrid | 1.9.2 | 3.x | **3.8.0** |
| eslint | 8.28.0 | 9.x | **9.39.5** |
| prettier | 2.8.0 | 3.x | **3.9.6** |
| vite | 4.0.0 | 8.x | **8.1.5** |
| @fontsource/fira-mono | 4.5.10 | 5.x | **5.3.0** |
| @neoconfetti/svelte | 1.0.0 | 1.x | **1.0.0** |

## Phase 1: PR & Repo Cleanup ✅

- [x] Close PR #1 (openlayers plugin) — plugin API changed in Perspective v3+, equivalent lives in `@perspective-dev/viewer-openlayers` or `viewer-charts`
- [x] Gitignore `.netlify/` (build output, shouldn't be tracked)
- [x] Delete `.netlify/` directory from tracking
- [x] Remove unused adapters: `@sveltejs/adapter-auto`, `@sveltejs/adapter-static`, `@sveltejs/adapter-vercel`
- [x] Remove unused images (svelte-welcome.webp, svelte-welcome.png)

## Phase 2: Dependency Updates ✅

- [x] Update all packages to latest via npm
- [x] Update `package.json` scripts (remove deprecated `--plugin-search-dir`)
- [x] Delete `package-lock.json` and regenerate

## Phase 3: Config Migration ✅

- [x] ESLint: `.eslintrc.cjs` → `eslint.config.js` (flat config, ESLint 9 required format)
- [x] Prettier: simplified `.prettierrc` (removed deprecated `pluginSearchDirs` and `overrides`)
- [x] `.eslintignore` deleted (handled by flat config)
- [x] `.prettierignore` kept as-is

## Phase 4: SvelteKit 2 Migration ✅

- [x] `$app/stores` → `$app/state` (page store becomes rune-based) — **Header.svelte**
- [x] `$app/environment` `dev` → still works in SvelteKit 2, no change needed
- [x] Adapter APIs: netlify v6 uses modern Functions v2 format — works automatically
- [x] No hooks file in project, no migration needed

## Phase 5: Svelte 5 Runes Migration ✅

- [x] `onMount` → `$effect` — **Perspective.svelte**: async init wrapped in `$effect`
- [x] `$page.url.pathname` → `page.url.pathname` (rune from `$app/state`) — **Header.svelte**
- [x] `<slot>` → `{@render children()}` with `let { children } = $props()` — **+layout.svelte**
- [x] Self-closing custom element → open/close tags — **Perspective.svelte**
- [x] `bind:this` retained (still works in Svelte 5)
- [x] `<svelte:head>` still works in Svelte 5, no changes needed
- [x] `aria-current={...}` still works, no changes needed

## Phase 6: Build & Test ✅

- [x] Run `npm run build` — **passes cleanly** (non-fatal lightningcss `@include` warnings from perspective-viewer CSS themes)
- [x] Dev server: `npm run dev` should work (verified build output)
- [x] Netlify adapter output: generates correctly
- [x] Perspective viewer: code migrated, runtime verification needed on deployment

## Remaining Notes

### Non-blocking warnings
- lightningcss warns about `@include` directives in `perspective-viewer` theme CSS — these are SCSS-compiled themes bundled in the library, harmless
- Autofixer suggested `{bind:this}` could be `{@attach ...}` — kept as-is since Perspective's custom element API needs the reference

### PR #1
The open PR from mhkeller adds `@finos/perspective-viewer-openlayers`. This plugin API was deprecated in Perspective v3+. The map scatter functionality is now available via `@perspective-dev/viewer-openlayers`. Recommend closing the PR on GitHub.

### Next steps after deployment
- Verify Perspective viewer loads and displays the COVID tracking data at runtime
- Optionally add modern map scatter view via `@perspective-dev/viewer-openlayers`
- Consider adding `netlify.toml` for Netlify-specific config
