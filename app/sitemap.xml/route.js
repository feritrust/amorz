export async function GET() {
  const base = "https://amorz.ir";

  // فعلاً یک sitemap ساده (صفحات اصلی)
  const urls = [
    "/",
    "/categories",
    "/products",
    "/about",
    "/contact-us",
    "/articles",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (p) => `
  <url>
    <loc>${base}${p}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
