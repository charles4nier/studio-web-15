import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
	// En production, définir NEXT_PUBLIC_SITE_URL=https://www.studioweb15.fr
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studioweb15.fr';

	// Le domaine par défaut *.vercel.app reste actif en parallèle du vrai domaine
	// (comportement normal de Vercel) — sans ce check, Google indexe le même
	// contenu deux fois (une fois sur www.studioweb15.fr, une fois sur le
	// domaine .vercel.app), d'où les pages "alternate canonical" en double.
	const host = headers().get('host') || '';
	const isAlternateHost = host.includes('vercel.app') || host.includes('staging');

	return {
		rules: {
			userAgent: '*',
			allow: isAlternateHost ? [] : '/',
			disallow: isAlternateHost ? ['/'] : []
		},
		sitemap: `${baseUrl}/sitemap.xml`
	};
}
