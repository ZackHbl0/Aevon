import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://aevon.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://aevon.com/en/projects/nexus-finance',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // In production, this would dynamically map over all active projects and pages
  ];
}
