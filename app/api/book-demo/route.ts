import { NextResponse } from "next/server";

// Server-side proxy to the n8n book-demo webhook. Posting from the browser
// directly to n8n.fiaxe.com is blocked by CORS, so we forward here instead.
const WEBHOOK_URL = "https://n8n.fiaxe.com/webhook/58e4e0d4-2014-4e82-b655-703d8fb862c9";

export async function POST(request: Request) {
  try {
    // Forward the raw body and its Content-Type straight through.
    const body = await request.arrayBuffer();
    const contentType = request.headers.get("content-type") ?? "application/json";

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": contentType },
      body,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("n8n book-demo webhook responded with", res.status, text);
      return NextResponse.json(
        { error: `Webhook responded with ${res.status}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Book demo webhook proxy failed:", err);
    return NextResponse.json({ error: "Failed to forward booking" }, { status: 500 });
  }
}
