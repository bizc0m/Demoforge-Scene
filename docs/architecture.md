# Architecture

DemoForge Scene is organized as a static site around three standalone browser tools.

## Site Layer

The site layer provides navigation, documentation and stable entry points:

- `index.html` is the public hub.
- `tools/*.html` gives one descriptive page per tool.
- `assets/site.css` contains shared layout and visual styling.

This layer should stay small and easy to review.

## Runtime Layer

The runtime layer contains the actual tools:

- `DemoForge_Studio.html`
- `DemoForge_ANSI_Motion.html`
- `demoforge_shader_v0_6_1_real_previews.html`

These files are standalone HTML applications. They are intentionally not split during the cleanup so existing GitHub Pages URLs and exports keep working.

## State

The Studio and Shader tools use `localStorage` for browser-side persistence. Use reset links when a local state blocks boot:

- `DemoForge_Studio.html?reset=1`

## Future Refactor Path

Recommended order:

1. Keep standalone runtime files as compatibility targets.
2. Extract shared constants and helpers into source modules.
3. Add Playwright coverage for boot, reset, import and export flows.
4. Add a build step only when source modules exist.
