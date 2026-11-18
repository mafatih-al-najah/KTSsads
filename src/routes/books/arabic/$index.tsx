import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { meta } from "@/components/SiteShell";
import { BookDetail } from "@/components/BookDetail";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic/$index")({
  head: ({ params }) =>
    meta(
      arabicBooks[Number(params.index)]?.label ?? "الكتاب غير موجود",
      "عرض وتحميل كتب المنهج العربي داخل موقع مفاتيح النجاح.",
    ),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { index } = Route.useParams();
  return (
    <BookDetail
      book={arabicBooks[Number(index)]}
      index={index}
      backLink={
        <Link
          to="/books/arabic"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى قائمة الكتب
        </Link>
      }
    />
  );
}
