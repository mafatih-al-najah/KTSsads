<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Branding shows `site.logoUrl` from src/data/site.ts when set, otherwise falls back to the shared channel-logo asset pointer (including the browser tab icon); keep the mark visible in both light and dark modes.
- Keep internal back/forward bounds in the page-navigation module and use router history actions so controls cannot leave the initial site visit.
- Site content (teacher ads, PDF links) lives in src/data/site.ts; no owner login, so the non-technical owner edits one file.
- Convert PDF preview and download links in src/lib/pdf-links.ts so Drive files use distinct viewing and download endpoints consistently.
- Books and notes share DownloadChoices and the StudyResource part shape; keep their editable collections in site.ts so every section uses the same provider ordering and per-part links.
