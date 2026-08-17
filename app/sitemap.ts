import { MetadataRoute } from 'next';
import { client } from '@shared/utils/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studioweb15.fr';

	const slugs: string[] = await client.fetch(
		`*[_type == "realisation" && defined(slug.current)].slug.current`
	);

	const realisationEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
		url: `${baseUrl}/realisations/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.7
	}));

	const postSlugs: { slug: string; publishedAt: string }[] =
		await client.fetch(
			`*[_type == "post" && defined(slug.current)]{"slug": slug.current, publishedAt}`
		);

	const postEntries: MetadataRoute.Sitemap = postSlugs.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
		changeFrequency: 'monthly',
		priority: 0.6
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: `${baseUrl}/realisations`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9
		},
		...realisationEntries,
		{
			url: `${baseUrl}/tarifs`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8
		},
		...postEntries,
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		}
	];
}
