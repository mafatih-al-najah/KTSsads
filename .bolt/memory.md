# Project memory

## Product intent & audience

- Arabic-language web app built with Vite + React.
- Contains a "امتيازات المتميزين 2026" (Premium Privileges 2026) page showcasing a premium benefits PDF.
- Audience: Arabic-speaking users on both mobile and desktop.

## Brand personality & voice

- Arabic UI (RTL). All user-facing copy in Arabic.
- Tone: polished, artistic, creative — user explicitly asked for "جميل جدا وفني وابداعي وبلمساتك الخاصة."

## Visual design & UX direction

- Privileges page embeds a Google Drive PDF viewer for in-site browsing (instead of the earlier image-gallery/carousel approach).
- Download button links directly to the Google Drive file.
- Responsive layout for mobile and desktop.

## Decisions, constraints & rationale

- Privileges PDF is hosted on Google Drive and embedded via Drive viewer; no need to extract page images or render them individually.
- Google Drive file ID: `1Neao1olLsCg3c3kX9jN-eHcZQ28rqbA6` (used for both embed and download).
- Bug fixed: page was importing `pdfFiles` from the wrong location (it lives outside the `site` object); corrected the import so the page doesn't break.
- Build passes and checks pass after fix.
- Framework: Vite + React.

## Open questions & assumptions

- Google Drive link sharing must remain public ("anyone with the link") for the embed/download to work.
- Earlier assumption that five PDF page images would be uploaded is now superseded by the embedded Drive PDF approach.