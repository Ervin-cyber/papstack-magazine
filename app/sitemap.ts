import { MetadataRoute } from 'next';
import { getPosts, getCategories } from '@/sanity/sanity-utils';
import { Post } from '@/types/Post';
import { Category } from '@/types/Category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magazine.papstack.net';

    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    try {
        const posts: Post[] = await getPosts("");
        const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
            url: `${baseUrl}/post/${post.slug.current}`,
            lastModified: new Date(post.publishedAt || post._createdAt),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));
        routes.push(...postUrls);
    } catch (error) {
        console.error("Error retrieving posts for sitemap:", error);
    }

    try {
        const categories: Category[] = await getCategories();
        const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
            url: `${baseUrl}/${category.slug.current}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));
        routes.push(...categoryUrls);
    } catch (error) {
        console.error("Error retrieving posts for sitemap:", error);
    }

    return routes;
}