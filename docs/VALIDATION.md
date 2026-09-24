# Validation · 2026-09-24

- Homepage inspected at 1440px and 390px widths, in English and Chinese, with light and dark themes (eight combinations). No horizontal overflow or JavaScript page errors. Mobile repository counts remain on one line.
- Featured AI Bro link, newest-first milestone dates, and language-specific CV download links verified.
- The live contribution API returned usable data. Controlled browser checks also covered a complete response, a network failure, HTTP 503, and an incomplete response. Failure paths show unknown counts and no generated activity cells; a current streak can continue from yesterday while today is still empty.
- Both CVs exported as one A4 page. Measured content fill: English 96%, Chinese 96%; no horizontal overflow or footer overlap.
- Both final PDFs rendered with Poppler and visually inspected. Text extraction confirmed all four papers, AI Bro, and the academic identity; ten clickable links per PDF were verified.
- The HTML CVs were opened directly from the filesystem, edited with keyboard input, downloaded, and reopened. Edited content and embedded styling were retained, with editing initially disabled on reopening.
- Local asset/CV links and JavaScript syntax checked; `git diff --check` passed.

The detailed local screenshots and machine-readable measurements are under ignored `tmp/qa/` and `tmp/cv-preview/`. They are intentionally excluded from the public site repository.
