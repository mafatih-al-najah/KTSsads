import { pdfLinks } from "@/lib/pdf-links";
import { sanitizeSafeUrl } from "@/lib/security";

export type ResourcePart = { label: string; url: string; telegramUrl?: string };
export type StudyResource = {
  label: string;
  teacher?: string;
  year?: string;
  parts: ResourcePart[];
};

export function downloadOptions(part?: ResourcePart) {
  const safeTelegram = part?.telegramUrl
    ? sanitizeSafeUrl(part.telegramUrl, { allowRelative: false })
    : "";
  return [
    { provider: "telegram" as const, href: safeTelegram },
    { provider: "drive" as const, href: part?.url.trim() ? pdfLinks(part.url).download : "" },
  ];
}
