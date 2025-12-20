import { MetadataRoute } from 'next';
import { cities } from '@/lib/cityData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://readyflow.in';

  // 1. High-Priority Service Routes (Commercial SEO)
  // Humne is naye Shopify page ko top priority di hai
  const serviceRoutes = [
    '/services/shopify-store-setup',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0, // Commercial intent is highest
  }));

  // 2. City-Based Routes (Local SEO - "Website near me")
  const cityRoutes = Object.keys(cities).map(city => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, 
  }));

  // 3. Authority Guides (Educational SEO)
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

  // 4. Utility Tool Routes (Lead Magnets)
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

  // Final Sitemap Array
  return [
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority: 1.0 
    },
    ...serviceRoutes,
    ...cityRoutes,
    ...guideRoutes,
    ...toolRoutes,
  ];
}