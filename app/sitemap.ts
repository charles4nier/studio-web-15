import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studioweb15.fr';

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: `${baseUrl}/tarifs`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9
		},
		{
			url: `${baseUrl}/agence-locale`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.85
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		}
	];
}
