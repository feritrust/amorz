export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://amorz.ir/sitemap.xml
`.trim();

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
