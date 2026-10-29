import { describe, expect, it } from "vitest";
import { announcementSchema } from "@/lib/site-announcements";

const valid = {
  id: "3f1c8a2e-6b1d-4c7e-9a10-2d5f7b8c9e01",
  message: "التسجيل مفتوح للدورة الجديدة",
  icon: null,
  image_url: null,
  cta_label: "سجّل الآن",
  cta_url: "https://t.me/example",
};

describe("announcementSchema", () => {
  it("accepts a complete announcement", () => {
    expect(announcementSchema.parse(valid)).toEqual(valid);
  });

  it("rejects non-https call-to-action links", () => {
    expect(() => announcementSchema.parse({ ...valid, cta_url: "http://t.me/example" })).toThrow();
  });

  it("rejects non-https images", () => {
    expect(() => announcementSchema.parse({ ...valid, image_url: "javascript:alert(1)" })).toThrow();
  });

  it("rejects an empty message", () => {
    expect(() => announcementSchema.parse({ ...valid, message: "" })).toThrow();
  });
});
