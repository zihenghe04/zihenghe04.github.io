# Content review · 2026-09-24

## Homepage updates

- Featured repository: [AI Bro](https://github.com/zihenghe04/AIBro), the public distribution repository. GitHub API snapshot on 2026-09-24: 328 stars, 41 forks. Runtime counts continue to refresh from the API.
- 2026-09-17: [AI Bro v0.7.9 macOS preview](https://github.com/zihenghe04/AIBro/releases/tag/v0.7.9). Release notes support the capability-loading and YAML/TOML attachment descriptions. The release is explicitly a preview.
- 2026-09-12: AI Bro public repository creation and [initial public v0.6.3 release](https://github.com/zihenghe04/AIBro/releases/tag/v0.6.3). Milestone dates use GitHub's UTC timestamps.
- 2026-09-05: SKIP accepted at CoRL 2026. Acceptance status/date were already present in the previously published homepage; this update preserves them. No claim of a completed camera-ready submission or published proceedings is added.

## Academic CV

The owner selected a public academic CV, in both English and Chinese, on 2026-09-24. Existing education and research-experience dates are retained from the published CV; no new appointment or end date is inferred. The academic version uses a public email, homepage, and GitHub as contact points.

Paper titles and authorship were checked against the current arXiv records:

- [SKIP](https://arxiv.org/abs/2606.00664): first author; CoRL acceptance retained from the published homepage. The 4.16x speedup and 89.0% FVD reduction are paper-level results.
- [GigaBrain-0.7](https://arxiv.org/abs/2608.15875): team paper including Ziheng He. The System 3 responsibility statement is retained from the existing CV; the whole architecture and dataset are not attributed to one contributor.
- [XEWorld](https://arxiv.org/abs/2608.05799): collaborative preprint, author order checked.
- [WAM-Nav](https://arxiv.org/abs/2606.04907): collaborative preprint, author order checked.

Project descriptions follow the public [AI Bro README](https://github.com/zihenghe04/AIBro), [CCDash release](https://github.com/zihenghe04/CCDash/releases/tag/v0.9.2), and the previously published AionUi contribution description. AionUi is labelled Contributor; repository-wide stars are not presented as personal achievement metrics.

The new CV brings all four papers together and foregrounds AI Bro. It uses concise research descriptions instead of the detailed interview-oriented bullets in the old internship CV. Future edits should preserve the distinction between an accepted conference paper, a preprint, an application preview, and a completed product release.

Following the owner's visual feedback on the same day, the CV restores the earlier version's multicolor institution headers, original logos, and portrait. AI Bro uses its existing application icon. This is a presentation change; the updated academic content is retained. Images are embedded into the generated HTML so an edited download keeps its artwork.

## Verification checklist

- Regenerate English and Chinese HTML/PDF from the shared content source.
- Check A4 pagination, footer separation, font rendering, selectable text, and visible paper/repository URLs.
- Check homepage language switching, the corresponding PDF URLs, and mobile/light/dark layouts.
- Exercise contribution API success, unavailable, and incomplete-response paths; never synthesize contributions.
- After a successful Pages build, compare live HTML and PDFs with the committed local files.
