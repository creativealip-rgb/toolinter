export const dynamic = "force-static";

export async function GET() {
  return new Response("google-site-verification: google2795416afbf45307.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
