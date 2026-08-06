# DemoForge Scene

DemoForge Scene is a static browser toolkit for demoscene-style creation.

Public entry point:

- https://bizc0m.github.io/Demoforge-Scene/

## Tools

- `DemoForge Studio` - main scene editor with layers, effects, media imports, snapshots and standalone HTML export.
- `ANSI Motion` - canvas pipeline for ANSI/glitch/motion treatments and compact visual exports.
- `Shader Real Previews` - WebGL shader browser with live parameters, mutation and HTML export.

## Local Use

No build step is required.

```bash
python3 -m http.server 8766
open http://127.0.0.1:8766/
```

The tools are browser-only HTML runtimes. For the Studio, prefer the reset URL when opening a fresh session:

```text
DemoForge_Studio.html?reset=1
```

## Structure

```text
index.html                                      Hub
tools/studio.html                              Studio presentation page
tools/ansi-motion.html                         ANSI Motion presentation page
tools/shader-previews.html                     Shader presentation page
assets/site.css                                Shared site styles
DemoForge_Studio.html                          Studio runtime
DemoForge_ANSI_Motion.html                     ANSI Motion runtime
demoforge_shader_v0_6_1_real_previews.html     Shader runtime
docs/architecture.md                           Architecture notes
docs/release-checklist.md                      Manual release checklist
tests/smoke.mjs                                Static smoke test
```

## Test

```bash
npm test
```

The smoke test starts a local static server and verifies that the hub, tool pages and runtime pages respond correctly.

## Notes

- Project state is stored in browser `localStorage`.
- Imported media can increase exported HTML size.
- The current runtimes are intentionally kept as standalone HTML files.
