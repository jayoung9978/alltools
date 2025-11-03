import { MetadataRoute } from 'next';
import { toolCategories } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://asdw.kr';

  // 기본 페이지
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // 카테고리 페이지 추가
  toolCategories.forEach((category) => {
    routes.push({
      url: `${baseUrl}${category.id === 'home' ? '' : `/${category.id}`}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // 각 카테고리의 도구 페이지 추가
    category.tools.forEach((tool) => {
      routes.push({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
