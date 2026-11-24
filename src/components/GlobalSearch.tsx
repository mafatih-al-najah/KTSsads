import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  NotebookPen,
  Search,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  getFeaturedSuggestions,
  getSearchIndex,
  quickSearchTopics,
  searchCategoryLabels,
  searchContent,
  type SearchCategory,
  type SearchItem,
  type SearchItemCategory,
} from "@/lib/global-search";
import { sanitizeTextInput } from "@/lib/security";

const categoryIcons: Record<SearchItemCategory, LucideIcon> = {
  notes: NotebookPen,
  books: BookOpen,
  teachers: User,
  guides: Compass,
};

const categories: SearchCategory[] = ["all", "notes", "books", "teachers", "guides"];

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(() => getSearchIndex(), []);
  const featured = useMemo(() => getFeaturedSuggestions(allItems), [allItems]);

  const queryMatches = useMemo(() => searchContent(query, "all", allItems), [query, allItems]);

  const counts = useMemo(() => {
    const map: Record<SearchCategory, number> = {
      all: queryMatches.length,
      notes: 0,
      books: 0,
      teachers: 0,
      guides: 0,
    };
    for (const item of queryMatches) {
      map[item.category] += 1;
    }
    return map;
  }, [queryMatches]);

  const results = useMemo(() => {
    if (!query.trim() && category === "all") {
      return featured;
    }
    if (category === "all") {
      return queryMatches.slice(0, 30);
    }
    return queryMatches.filter((item) => item.category === category).slice(0, 30);
  }, [query, category, queryMatches, featured]);

  const clampedActiveIndex = results.length > 0 ? Math.min(activeIndex, results.length - 1) : -1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (
        event.key === "/" &&
        !open &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement) &&
        !(event.target as HTMLElement | null)?.isContentEditable
      ) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (clampedActiveIndex < 0 || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `[data-search-index="${clampedActiveIndex}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [clampedActiveIndex]);

  const selectItem = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    setCategory("all");
    void router.navigate({
      to: item.to,
      ...(item.hash !== undefined ? { hash: item.hash } : {}),
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev + 1) % results.length);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (event.key === "Enter" && clampedActiveIndex >= 0) {
      const selected = results[clampedActiveIndex];
      if (selected) {
        event.preventDefault();
        selectItem(selected);
      }
    }
  };

  const showQuickTopics = !query.trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="بحث في المحتوى التعليمي"
        title="بحث في المحتوى التعليمي (Ctrl+K)"
        className="btn-surface ripple-surface flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 text-sm text-muted-foreground shadow-sm hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Search className="h-4 w-4 shrink-0 text-primary" />
        <span className="hidden whitespace-nowrap sm:inline">ابحث...</span>
        <kbd
          dir="ltr"
          className="hidden rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground md:inline-block"
        >
          Ctrl K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          dir="rtl"
          className="top-[10%] max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-0 text-card-foreground shadow-glow backdrop-blur-xl sm:rounded-3xl [&>button]:hidden"
        >
          <DialogTitle className="sr-only">البحث الشامل في المحتوى التعليمي</DialogTitle>
          <DialogDescription className="sr-only">
            ابحث عن الملازم، الكتب، المدرسين، الحدود الدنيا، والنصائح الدراسية حسب العنوان أو
            الموضوع.
          </DialogDescription>

          <div className="flex items-center gap-2 border-b px-4 py-3.5">
            <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              maxLength={120}
              value={query}
              onChange={(event) => {
                setQuery(sanitizeTextInput(event.target.value, 120));
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="ابحث بالعنوان أو الموضوع (مثال: كلاميات، عقيل الزبيدي، الفيزياء، الإسلامية)..."
              aria-label="ابحث في المحتوى التعليمي"
              aria-autocomplete="list"
              aria-controls="global-search-results"
              aria-activedescendant={
                clampedActiveIndex >= 0 && results[clampedActiveIndex]
                  ? `search-option-${results[clampedActiveIndex].id}`
                  : undefined
              }
              className="h-9 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveIndex(0);
                  inputRef.current?.focus();
                }}
                aria-label="مسح البحث"
                className="relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="إغلاق البحث"
              className="relative grid h-8 shrink-0 place-items-center overflow-hidden rounded-lg border px-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              إغلاق
            </button>
          </div>

          <div
            role="tablist"
            aria-label="تصفية نتائج البحث"
            className="flex items-center gap-1.5 overflow-x-auto border-b bg-muted/40 px-3 py-2.5"
          >
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setCategory(cat);
                    setActiveIndex(0);
                  }}
                  className={`relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span>{searchCategoryLabels[cat]}</span>
                  <span className="tabular-nums opacity-80">{counts[cat]}</span>
                </button>
              );
            })}
          </div>

          {showQuickTopics && (
            <div className="border-b px-4 py-3">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">مواضيع سريعة</p>
              <div className="flex flex-wrap gap-1.5">
                {quickSearchTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setQuery(topic);
                      setActiveIndex(0);
                      inputRef.current?.focus();
                    }}
                    className="btn-surface ripple-surface rounded-xl border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            id="global-search-results"
            ref={listRef}
            role="listbox"
            aria-label="نتائج البحث"
            className="max-h-[55vh] overflow-y-auto p-2"
          >
            {showQuickTopics && category === "all" && (
              <p className="px-3 pb-1.5 pt-1 text-xs font-semibold text-muted-foreground">
                مقترحات شائعة
              </p>
            )}

            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map((item, idx) => {
                  const Icon = categoryIcons[item.category];
                  const active = idx === clampedActiveIndex;
                  return (
                    <button
                      key={item.id}
                      id={`search-option-${item.id}`}
                      data-search-index={idx}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => selectItem(item)}
                      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-2.5 text-right transition-all duration-150 active:scale-[0.99] ${
                        active ? "bg-secondary text-foreground" : "hover:bg-muted/70"
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                          active ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-foreground">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {searchCategoryLabels[item.category]} · {item.subtitle}
                        </span>
                      </span>
                      <ArrowLeft
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition ${
                          active ? "translate-x-0 opacity-100 text-primary" : "opacity-40"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm font-semibold text-foreground">
                  لا توجد نتائج مطابقة لـ «{query.trim()}»
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  جرّب البحث باسم المادة، المدرس، أو عنوان الكتاب
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    inputRef.current?.focus();
                  }}
                  className="btn-surface ripple-surface mt-4 rounded-xl border px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  عرض جميع المقترحات
                </button>
              </div>
            )}
          </div>

          <div className="hidden items-center justify-between border-t bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground sm:flex">
            <span>التنقل بالأسهم ↑ ↓ · فتح النتيجة Enter</span>
            <span className="tabular-nums">
              {results.length > 0 ? `عرض ${results.length} نتيجة` : "0 نتائج"}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
