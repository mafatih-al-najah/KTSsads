# Project memory

## Product intent & audience

- Arabic-language web app built with Vite + React.
- Contains a "امتيازات المتميزين" (Premium Privileges) page meant to showcase privilege/benefit pages as an interactive image gallery.
- Audience: Arabic-speaking users on both mobile and desktop.

## Brand personality & voice

- Arabic UI (RTL). All user-facing copy in Arabic.
- Tone: polished, artistic, creative — user explicitly asked for "جميل جدا وفني وابداعي وبلمساتك الخاصة."

## Visual design & UX direction

- Image gallery/carousel pattern for the privileges section (not vertical stacking).
- One image visible at a time.
- Navigation: left/right arrows + swipe/drag (touch and mouse) + horizontal scroll.
- Page indicators (dots) below the gallery.
- Responsive layout for mobile and desktop.
- Keyboard navigation support (arrow keys).
- Smooth, animated transitions between slides.

## Decisions, constraints & rationale

- PDF pages must be rendered as individual images, not embedded as a PDF viewer.
- Only one image was available in project files at build time; the five PDF pages referenced by the user were not uploaded into the project. Gallery will show a single image until actual page images are added.
- Build verified successfully after implementing the gallery.
- Framework: Vite + React.

## Open questions & assumptions

- Source images for the five PDF pages still need to be added to project files; current gallery has only one image.
- Assumption: user will provide extracted PDF page images (PNG/JPG) to populate the carousel.
- Preferred image dimensions/aspect ratio for consistent slide sizing not yet specified.