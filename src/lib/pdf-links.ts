export function pdfLinks(url: string) {
  const source = url.trim();
  let fileId: string | null = null;
  try {
    const parsed = new URL(source);
    if (parsed.hostname === "drive.google.com") {
      fileId = parsed.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1] ?? parsed.searchParams.get("id");
    }
  } catch {
    // Local PDF paths do not need conversion.
  }
  if (fileId && /^[\w-]+$/.test(fileId)) {
    return {
      preview: `https://drive.google.com/file/d/${fileId}/preview`,
      download: `https://drive.google.com/uc?export=download&id=${fileId}`,
      isDrive: true,
    };
  }
  return { preview: source, download: source, isDrive: false };
}