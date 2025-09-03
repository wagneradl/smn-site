export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://smn.example';
  const urls = ['/', '/work', '/blog', '/contact', '/about', '/solucoes'];
  const now = new Date();
  return urls.map((p) => ({ url: new URL(p, base).toString(), lastModified: now }));
}
