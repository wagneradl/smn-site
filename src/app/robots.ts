export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://smn.example'
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: new URL('/sitemap.xml', base).toString(),
  }
}
