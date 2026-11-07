import { describe, expect, it } from "vitest";
import { downloadOptions } from "@/lib/download-options";

describe("Resource download choices", () => {
  it("places Telegram before Google Drive for every resource", () => {
    expect(downloadOptions().map((option) => option.provider)).toEqual(["telegram", "drive"]);
  });
  it("uses the owner's Telegram link without replacing it with the channel homepage", () => {
    expect(downloadOptions({ label: "جزء", telegramUrl: " https://t.me/books/123 ", url: "" })[0]?.href).toBe("https://t.me/books/123");
  });
  it("downloads the selected part's Google Drive file", () => {
    expect(downloadOptions({ label: "جزء", url: "https://drive.google.com/file/d/part_2/view" })[1]?.href).toBe("https://drive.google.com/uc?export=download&id=part_2");
  });
  it("keeps missing links unavailable instead of inventing a destination", () => {
    expect(downloadOptions({ label: "جزء", url: "", telegramUrl: " " }).map((option) => option.href)).toEqual(["", ""]);
  });
});