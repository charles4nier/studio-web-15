import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studioweb15.fr';

	// Si on est en staging, on n'indexe pas
	const isStaging = baseUrl.includes('staging') || baseUrl.includes('vercel.app');

	return {
		rules: {
			userAgent: '*',
			allow: isStaging ? [] : '/',
			disallow: isStaging ? ['/'] : []
		},
		sitemap: `${baseUrl}/sitemap.xml`
	};
}
