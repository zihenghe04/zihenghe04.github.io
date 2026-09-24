# Ziheng He · Personal Homepage

Source for [zihenghe04.github.io](https://zihenghe04.github.io/). English and Chinese share one homepage; the language switch also selects the matching academic CV.

## Maintain the homepage

- `index.html`: homepage layout and bilingual copy. Update both `data-en` and `data-zh`, plus the visible English text. Keep milestones newest first and link to the underlying release or paper.
- `imgs/`: profile and publication images.
- `cv/content.json`: shared facts and bilingual content for the academic CV. Paper titles, author lists, and links are shared by both languages.
- `cv/style.css`: single-column A4 CV layout, with the original colored institution bands.
- `cv/assets/`: original portrait and institution logos, plus the AI Bro icon. The builder embeds these images in each HTML file so saved copies remain self-contained.
- `cv/Ziheng-He-CV-{en,zh}.html`: generated, browser-editable CVs.
- `cv/Ziheng-He-CV-{en,zh}.pdf`: published CV downloads.
- `docs/CONTENT_SOURCES.md`: verification sources and the most recent content review.

GitHub Pages publishes the repository root on `main`. A push to `main` updates the live site after its Pages build finishes. This repository is the maintained source; older exports elsewhere are historical copies.

## Preview locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. Check English/Chinese, light/dark appearance, a narrow mobile viewport, repository links, and both CV downloads.

## Regenerate the CV

The template preserves the earlier CV's portrait, blue section headings, institution logos, and individual brand colors while presenting the updated academic content. Color and logo assignments live alongside each entry in `cv/content.json`; layout remains editable in `cv/style.css`. It does not depend on an external resume template pack. Browser exports use locally available fonts: Times New Roman and Songti SC on macOS, with Noto Serif CJK SC as an alternative for Chinese.

```sh
npm ci
npm run cv
```

The exporter uses Google Chrome at its standard macOS location if available. On other systems, install the bundled browser with `npx playwright install chromium`, or set `CHROME_PATH` to a Chromium-based browser executable. Install a Chinese font before exporting the Chinese CV.

`npm run build:cv` regenerates only HTML. `npm run export:cv` exports both PDFs and saves print previews plus layout measurements under ignored `tmp/cv-preview/`. Export stops if the content overflows the page or overlaps the footer. Inspect the actual PDFs after any content change; a successful export alone does not establish visual quality.

The HTML toolbar can edit text, save a self-contained edited HTML copy, and print. For durable changes, update `cv/content.json` and rebuild; changes made only in the browser are not written back to the shared JSON. Manual print settings: A4, scale 100%, background graphics enabled, browser headers/footers disabled.

When publishing new PDFs, change the `?v=...` values in both homepage CV links to invalidate cached downloads. Review `git diff`, commit, and push to `main`; then verify the deployed page and downloaded PDF contents.

## Live data

Repository stars and forks refresh from GitHub's public API; checked-in counts are fallback snapshots. Contribution history comes from `github-contributions-api.jogruber.de`; failures display an unavailable state, never synthetic activity. Milestones and CV facts are curated rather than inferred from activity counts.

Notes sync through the existing Notion proxy. Its Worker is maintained separately. There are no Notion tokens or other credentials in this repository.
