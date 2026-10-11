import type { MetadataRoute } from 'next';
import posts from '../src/content/posts.json';

const siteUrl = 'https://azzankhan.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/work/', '/services/', '/about/', '/blog/', '/contact/'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
  const articles = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));
  return [...pages, ...articles];
}
