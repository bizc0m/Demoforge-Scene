# Release Checklist

Run before publishing or tagging a release.

- Hub opens at `/`.
- `DemoForge_Studio.html?reset=1` boots without console errors.
- `DemoForge_ANSI_Motion.html` boots without console errors.
- `demoforge_shader_v0_6_1_real_previews.html` boots and compiles the default shader.
- Studio HTML export downloads a standalone file.
- Studio JSON export downloads a project file.
- ANSI Motion exports at least one still frame.
- Shader page exports a studio HTML file.
- `npm test` passes.
- README links match the deployed GitHub Pages URL.
