import { pdfLinks } from "@/lib/pdf-links";

export type ResourcePart = { label: string; url: string; telegramUrl?: string };
export type StudyResource = { label: string; parts: ResourcePart[] };

export function downloadOptions(part?: ResourcePart) {
  return [
    { provider: "telegram" as const, href: part?.telegramUrl?.trim() ?? "" },
    { provider: "drive" as const, href: part?.url.trim() ? pdfLinks(part.url).download : "" },
  ];
}