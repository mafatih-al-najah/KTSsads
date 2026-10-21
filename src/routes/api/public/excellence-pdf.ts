import { createFileRoute } from "@tanstack/react-router";

// Streams the single published excellence PDF from the private bucket (read-only, no private data).
export const Route = createFileRoute("/api/public/excellence-pdf")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("excellence").download("excellence.pdf");
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="excellence.pdf"',
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
