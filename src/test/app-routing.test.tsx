import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the nested teacher subject and section pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/notes/teachers").at(-1)?.routeId).toBe("/notes/$track");
    expect(router.matchRoutes("/notes/teachers/arabic").at(-1)?.routeId).toBe(
      "/notes/$track/$subject",
    );
    expect(router.matchRoutes("/notes/teachers/arabic/part-one").at(-1)?.routeId).toBe(
      "/notes/$track/$subject/$teacher",
    );
    expect(
      router.matchRoutes("/notes/teachers/arabic/aqil-alzubaidi/chapters").at(-1)?.routeId,
    ).toBe("/notes/$track/$subject/$teacher/$section");
    expect(
      router.matchRoutes("/notes/teachers/arabic/aqil-alzubaidi/chapters/part-one").at(-1)?.routeId,
    ).toBe("/notes/$track/$subject/$teacher/$section/$chapter");
  });

  it("matches Arabic and excellence book listing and detail routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/books/arabic").at(-1)?.routeId).toBe("/books/arabic");
    expect(router.matchRoutes("/books/arabic/0").at(-1)?.routeId).toBe("/books/arabic/$index");
    expect(router.matchRoutes("/books/excellence").at(-1)?.routeId).toBe("/books/excellence");
    expect(router.matchRoutes("/books/excellence/0").at(-1)?.routeId).toBe(
      "/books/excellence/$index",
    );
  });
});
