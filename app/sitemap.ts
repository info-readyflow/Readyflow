import { MetadataRoute } from 'next';
import { cities, portfolioItems } from '@/lib/cityData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://readyflow.in';

  // 1. Tool Routes (Utility SEO)
  const toolRoutes = [
    '/tools/policy-generator',
    '/tools/profit-calculator',
    '/tools/smart-chatbot',
    '/tools/popup-builder'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 2. City Routes (Commercial SEO)
  const cityRoutes = Object.keys(cities).map(city => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority for services
  }));

  // 3. Guide Routes (Authority SEO)
  const guideRoutes = [
    '/guides/how-to-start-selling-online-india',
    '/guides/shopify-vs-woocommerce-india-cost',
    '/guides/rto-reduction-strategy-india'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...cityRoutes,
    ...guideRoutes,
    ...toolRoutes,
  ];
}