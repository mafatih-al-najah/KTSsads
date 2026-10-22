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

- Use the shared channel-logo asset pointer wherever branding is displayed, including the browser tab icon, and keep the mark visible in both light and dark modes.
- Keep internal back/forward bounds in the page-navigation module and use router history actions so controls cannot leave the initial site visit.
- Site content (teacher ads, PDF links) lives in src/data/site.ts; no owner login, so the non-technical owner edits one file.
