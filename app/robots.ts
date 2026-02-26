import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	// En production, définir NEXT_PUBLIC_SITE_URL=https://studioweb15.fr (sans staging / vercel.app)
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studioweb15.fr';
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
