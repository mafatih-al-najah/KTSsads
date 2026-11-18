import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { meta } from "@/components/SiteShell";
import { BookDetail } from "@/components/BookDetail";
import { excellenceBooks } from "@/data/site";

export const Route = createFileRoute("/books/excellence/$index")({
  head: ({ params }) =>
    meta(
      excellenceBooks[Number(params.index)]?.label ?? "الكتاب غير موجود",
      "عرض وتحميل كتب منهج المتميزين داخل موقع مفاتيح النجاح.",
    ),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { index } = Route.useParams();
  return (
    <BookDetail
      book={excellenceBooks[Number(index)]}
      index={index}
      backLink={
        <Link
          to="/books/excellence"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى قائمة الكتب
        </Link>
      }
    />
  );
}
